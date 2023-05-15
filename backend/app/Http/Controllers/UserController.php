<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Artist;
use App\Models\Album;
use App\Models\Followed;
use App\Models\Playlist;
use App\Models\Song;
use App\Models\TRX_Playlist;
use App\Models\view_song;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function get_discovery(Request $request)
    {
        $user = $request['userauth'];
        $user_id = $user['id'];

        // get most listened song
        $most_listened_song = view_song::select('song_id')
            ->where('user_id', $user_id)
            ->groupBy('song_id')
            ->orderByRaw('COUNT(*) DESC')
            ->limit(5)
            ->get();

        $popular_song = [];
        foreach ($most_listened_song as $song) {
            $s = Song::find($song['song_id']);
            $s->load(['artist', 'album']);

            $popular_song[] = $s;
        }
        // $most_listened_song->load(['song.artist', 'song.album']);

        $albums = Album::all();
        $albums->load(['artist', 'songs']);

        // get all playlist
        $playlist = Playlist::with('user', 'tracks')
            ->where('status', 'public')
            ->orWhere('user_id', $user_id)
            ->get();
        $playlist->load(['tracks.artist', 'tracks.album', 'tracks.genre']);

        return response()->json([
            'message' => 'Get discovery successful',
            'statusCode' => 200,
            'data' => [
                'popular_song' => $popular_song,
                'playlist' => $playlist,
                'albums' => $albums,
            ],
        ], 200);
    }

    public function search(Request $request)
    {
        $query = $request->query('q');
        if (!$query || empty($query)) {
            return response()->json([
                'message' => 'invalid query',
                'statusCode' => 400,
            ], 400);
        }


        $user = $request['userauth'];
        $user_id = $user['id'];

        $keyword = $request->query('q');
        $keyword = strtolower($keyword);

        $songs = Song::where('title', 'LIKE', "%{$keyword}%")->get();
        $songs->load(['artist', 'album']);

        $albums = Album::whereRaw('LOWER(title) LIKE ?', ["%{$keyword}%"])->get();
        $albums->load(['artist']);

        $artists = Artist::whereRaw('LOWER(name) LIKE ?', ["%{$keyword}%"])->get();

        $playlists = Playlist::with('user', 'tracks')
            ->where('name', 'LIKE', "%{$keyword}%")
            ->where('status', 'public')
            ->orWhere('user_id', $user_id)
            ->get();

        $playlists->load(['tracks.artist', 'tracks.album', 'tracks.genre']);
        // $playlists
        // ->tracks()
        // ->where('status', 'public')
        // ->orWhere('user_id', $user_id);
        // // filter public only and private with user_id
        // $playlists = $playlists->filter(function ($value, $key) use ($user_id) {
        //     return $value['user_id'] == $user_id || $value['status'] == 'public';
        // });
        // $playlists = $playlists->values()->all();

        return response()->json([
            'message' => 'Search successful',
            'statusCode' => 200,
            'data' => [
                'songs' => $songs,
                'albums' => $albums,
                'artists' => $artists,
                'playlists' => $playlists,
            ],
        ], 200);
    }

    public function play(Request $request, $id)
    {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $song = Song::find($id);
        if (!$song) {
            return response()->json([
                'message' => 'Song not found',
                'statusCode' => 404,
            ], 404);
        }

        $trx = new view_song();
        $trx->user_id = $user_id;
        $trx->song_id = $id;
        $trx->save();

        $file = $song['audio'];
        $path = public_path('audio/' . $file);
        $type = pathinfo($path, PATHINFO_EXTENSION);

        $data = file_get_contents($path);
        return response($data)->header('Content-Type', 'audio/' . $type);
    }

    public function get_my_playlist(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $playlist = Playlist::with('user', 'tracks')->where('user_id', $user_id)->get();
        $playlist->load(['tracks.artist', 'tracks.album', 'tracks.genre']);

        return response()->json([
            'message' => 'Get my playlist successful',
            'statusCode' => 200,
            'data' => $playlist,
        ], 200);
    }

    public function get_playlist_by_id(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        // filter song public only and private with user_id, and song published on tracks.song
        $playlist = Playlist::with('user', 'tracks')
            ->where('id', $id)
            ->where('status', 'public')
            ->orWhere('user_id', $user_id)
            ->first();

        if (!$playlist) {
            return response()->json([
                'message' => 'Playlist not found',
                'statusCode' => 404,
            ], 404);
        }

        $playlist->load(['tracks.artist', 'tracks.album', 'tracks.genre']);

        return response()->json([
            'message' => 'Get playlist successful',
            'statusCode' => 200,
            'data' => $playlist,
        ], 200);
    }

    public function create_playlist(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $v = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg',
            'status' => 'required|string|in:public,private'
        ]);

        if ($v->fails()) {
            return response()->json([
                'message' => 'Invalid input',
                'statusCode' => 400,
                'errors' => $v->errors(),
            ], 400);
        }

        $playlist = new Playlist();
        $playlist->user_id = $user_id;
        $playlist->name = $request->name;
        $playlist->description = $request->description;
        $playlist->status = $request->status;

        $image = $request->file('image');
        $image_name = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images/playlist'), $image_name);
        $playlist->image = $image_name;

        try {
            $playlist->save();

            return response()->json([
                'message' => 'Create playlist successful',
                'statusCode' => 200,
                'data' => $playlist,
            ], 200);
        } catch (\Throwable $th) {
            if (file_exists(public_path('images/playlist/' . $image_name))) unlink(public_path('images/playlist/' . $image_name));

            return response()->json([
                'message' => 'Create playlist failed',
                'statusCode' => 500,
                'errors' => $th->getMessage(),
            ], 500);
        }
    }

    public function update_playlist(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $playlist = Playlist::find($id);
        if (!$playlist) {
            return response()->json([
                'message' => 'Playlist not found',
                'statusCode' => 404,
            ], 404);
        }

        // filter public only and private with user_id
        if ($playlist['user_id'] != $user_id && $playlist['status'] != 'public') {
            return response()->json([
                'message' => 'Playlist not found',
                'statusCode' => 404,
            ], 404);
        }

        $v = Validator::make($request->all(), [
            'name' => 'string',
            'description' => 'string',
            'image' => 'image|mimes:jpeg,png,jpg',
            'status' => 'string|in:public,private',
            '__method' => 'required|string|in:PUT,PATCH'
        ]);

        if ($v->fails()) {
            return response()->json([
                'message' => 'Invalid input',
                'statusCode' => 400,
                'errors' => $v->errors(),
            ], 400);
        }

        $playlist->name = $request->name ?? $playlist->name;
        $playlist->description = $request->description ?? $playlist->description;
        $playlist->status = $request->status ?? $playlist->status;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_name = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/playlist'), $image_name);

            // delete old image
            if (file_exists(public_path('images/playlist/' . $playlist->image))) unlink(public_path('images/playlist/' . $playlist->image));

            $playlist->image = $image_name;
        }

        try {
            $playlist->save();

            return response()->json([
                'message' => 'Update playlist successful',
                'statusCode' => 200,
                'data' => $playlist,
            ], 200);
        } catch (\Throwable $th) {
            if (file_exists(public_path('images/playlist/' . $image_name))) unlink(public_path('images/playlist/' . $image_name));

            return response()->json([
                'message' => 'Update playlist failed',
                'statusCode' => 500,
                'errors' => $th->getMessage(),
            ], 500);
        }
    }

    public function delete_playlist(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $playlist = Playlist::find($id);
        if (!$playlist) {
            return response()->json([
                'message' => 'Playlist not found',
                'statusCode' => 404,
            ], 404);
        }

        // filter public only and private with user_id
        if ($playlist['user_id'] != $user_id && $playlist['status'] != 'public') {
            return response()->json([
                'message' => 'Playlist not found',
                'statusCode' => 404,
            ], 404);
        }

        // delete all song in trx_playlist_song
        $playlist->song()->detach();

        try {
            $playlist->delete();

            if (file_exists(public_path('images/playlist/' . $playlist->image))) unlink(public_path('images/playlist/' . $playlist->image));
            return response()->json([
                'message' => 'Delete playlist successful',
                'statusCode' => 200,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Delete playlist failed',
                'statusCode' => 500,
                'errors' => $th->getMessage(),
            ], 500);
        }
    }

    public function add_song_to_playlist(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $playlist = Playlist::find($id);
        if (!$playlist) {
            return response()->json([
                'message' => 'Playlist not found',
                'statusCode' => 404,
            ], 404);
        }

        // filter public only and private with user_id
        if ($playlist['user_id'] != $user_id && $playlist['status'] != 'public') {
            return response()->json([
                'message' => 'Playlist not found',
                'statusCode' => 404,
            ], 404);
        }

        $v = Validator::make($request->all(), [
            'song_id' => 'required|integer',
        ]);

        if ($v->fails()) {
            return response()->json([
                'message' => 'Invalid input',
                'statusCode' => 400,
                'errors' => $v->errors(),
            ], 400);
        }

        // check if song already in playlist
        $check = $playlist->song()->where('song_id', $request->song_id)->first();
        if ($check) {
            return response()->json([
                'message' => 'Song already in playlist',
                'statusCode' => 400,
            ], 400);
        }

        // check if song status is published
        $song = Song::where('id', $request->song_id)->where('status', 'published')->first();
        if (!$song) {
            return response()->json([
                'message' => 'Song not found or not published',
                'statusCode' => 404,
            ], 404);
        }


        try {
            $playlist->song()->attach($request->song_id);

            return response()->json([
                'message' => 'Add song to playlist successful',
                'statusCode' => 200,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Add song to playlist failed',
                'statusCode' => 500,
                'errors' => $th->getMessage(),
            ], 500);
        }
    }

    public function remove_song_from_playlist(Request $request, $id, $song_id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $playlist = Playlist::find($id);
        if (!$playlist) {
            return response()->json([
                'message' => 'Playlist not found',
                'statusCode' => 404,
            ], 404);
        }

        // filter public only and private with user_id
        if ($playlist['user_id'] != $user_id && $playlist['status'] != 'public') {
            return response()->json([
                'message' => 'Playlist not found',
                'statusCode' => 404,
            ], 404);
        }

        if (!$song_id) {
            return response()->json([
                'message' => 'Song not found',
                'statusCode' => 404,
            ], 404);
        }

        // check if song already in playlist
        $check = $playlist->song()->where('song_id', $song_id)->first();
        if (!$check) {
            return response()->json([
                'message' => 'Song not found in playlist',
                'statusCode' => 400,
            ], 400);
        }

        try {
            $playlist->song()->detach($request->song_id);

            return response()->json([
                'message' => 'Remove song from playlist successful',
                'statusCode' => 200,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Remove song from playlist failed',
                'statusCode' => 500,
                'errors' => $th->getMessage(),
            ], 500);
        }
    }

    public function get_following_artist(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Followed::where('user_id', $user_id)->with('artist')->get();
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        return response()->json([
            'message' => 'Get following artist successful',
            'statusCode' => 200,
            'data' => $artist,
        ], 200);
    }

    public function follow(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Artist::find($id);
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        // if artist it's yourself
        if ($artist['user_id'] == $user_id) {
            return response()->json([
                'message' => 'You cannot follow yourself',
                'statusCode' => 400,
            ], 400);
        }

        // check if artist already followed
        $check = Followed::where('user_id', $user_id)->where('artist_id', $id)->first();
        if ($check) {
            return response()->json([
                'message' => 'Artist already followed',
                'statusCode' => 400,
            ], 400);
        }

        try {
            $followed = new Followed();
            $followed->user_id = $user_id;
            $followed->artist_id = $id;
            $followed->save();

            return response()->json([
                'message' => 'Follow artist successful',
                'statusCode' => 200,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Follow artist failed',
                'statusCode' => 500,
                'errors' => $th->getMessage(),
            ], 500);
        }
    }

    public function unfollow(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Artist::find($id);
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        // check if artist already followed
        $check = Followed::where('user_id', $user_id)->where('artist_id', $id)->first();
        if (!$check) {
            return response()->json([
                'message' => 'Artist not followed',
                'statusCode' => 400,
            ], 400);
        }

        try {
            $check->delete();

            return response()->json([
                'message' => 'Unfollow artist successful',
                'statusCode' => 200,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Unfollow artist failed',
                'statusCode' => 500,
                'errors' => $th->getMessage(),
            ], 500);
        }
    }

    public function get_liked_songs(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $song = Playlist::where('user_id', $user_id)->where('name', 'Liked Songs')->with('song')->first();
        if (!$song) {
            // create playlist
            $playlist = new Playlist();
            $playlist->user_id = $user_id;
            $playlist->name = 'Liked Songs';
            $playlist->status = 'private';
            $playlist->image = 'default.png';
            $playlist->description = 'Liked Songs';
            $playlist->save();
        }

        $song = Playlist::where('user_id', $user_id)->where('name', 'Liked Songs')->first();
        if (!$song) {
            return response()->json([
                'message' => 'Liked Songs not found',
                'statusCode' => 404,
            ], 404);
        }

        $song->load('user', 'tracks.song');

        return response()->json([
            'message' => 'Get liked song successful',
            'statusCode' => 200,
            'data' => $song,
        ], 200);
    }

    public function like(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $song = Song::find($id);
        if (!$song) {
            return response()->json([
                'message' => 'Song not found',
                'statusCode' => 404,
            ], 404);
        }

        // check if song already liked
        $check = Playlist::where('user_id', $user_id)->where('name', 'Liked Songs')->first();
        if (!$check) {
            // create playlist
            $playlist = new Playlist();
            $playlist->user_id = $user_id;
            $playlist->name = 'Liked Songs';
            $playlist->status = 'private';
            $playlist->image = 'default.png';
            $playlist->description = 'Liked Songs';
            $playlist->save();

            $check = Playlist::where('user_id', $user_id)->where('name', 'Liked Songs')->first();
        }

        $check = $check->song()->where('song_id', $id)->first();
        if ($check) {
            return response()->json([
                'message' => 'Song already liked',
                'statusCode' => 400,
            ], 400);
        }

        try {
            $check = Playlist::where('user_id', $user_id)->where('name', 'Liked Songs')->first();
            $check->song()->attach($id);

            return response()->json([
                'message' => 'Like song successful',
                'statusCode' => 200,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Like song failed',
                'statusCode' => 500,
                'errors' => $th->getMessage(),
            ], 500);
        }
    }

    public function unlike(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $song = Song::find($id);
        if (!$song) {
            return response()->json([
                'message' => 'Song not found',
                'statusCode' => 404,
            ], 404);
        }

        // check if song already liked
        $check = Playlist::where('user_id', $user_id)->where('name', 'Liked Songs')->first();
        if (!$check) {
            return response()->json([
                'message' => 'Liked Songs not found',
                'statusCode' => 404,
            ], 404);
        }

        $check = $check->song()->where('song_id', $id)->first();
        if (!$check) {
            return response()->json([
                'message' => 'Song not liked',
                'statusCode' => 400,
            ], 400);
        }

        try {
            $check = Playlist::where('user_id', $user_id)->where('name', 'Liked Songs')->first();
            $check->song()->detach($id);

            return response()->json([
                'message' => 'Unlike song successful',
                'statusCode' => 200,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Unlike song failed',
                'statusCode' => 500,
                'errors' => $th->getMessage(),
            ], 500);
        }
    }

    public function get_all_albums(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $album = Album::with('artist', 'songs')->get();

        return response()->json([
            'message' => 'Get all album successful',
            'statusCode' => 200,
            'data' => $album,
        ], 200);
    }

    public function get_album_by_id(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $album = Album::with('artist', 'songs')->find($id);
        if (!$album) {
            return response()->json([
                'message' => 'Album not found',
                'statusCode' => 404,
            ], 404);
        }

        return response()->json([
            'message' => 'Get album successful',
            'statusCode' => 200,
            'data' => $album,
        ], 200);
    }
}