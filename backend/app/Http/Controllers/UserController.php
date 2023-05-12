<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Artist;
use App\Models\Album;
use App\Models\Playlist;
use App\Models\Song;
use App\Models\TRX_Playlist;
use App\Models\view_album;
use App\Models\view_song;

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

        $most_listened_song->load(['song.artist', 'song.album']);

        // get most listened album
        $most_listened_album = view_album::select('album_id')
            ->where('user_id', $user_id)
            ->groupBy('album_id')
            ->orderByRaw('COUNT(*) DESC')
            ->limit(5)
            ->get();

        $most_listened_album->load(['album.artist']);

        // get all playlist
        $playlist = TRX_Playlist::with('playlist', 'song')->get();
        // filter public only and private with user_id
        $playlist = $playlist->filter(function ($value, $key) use ($user_id) {
            return $value['playlist']['user_id'] == $user_id || $value['playlist']['status'] == 'public';
        });

        return response()->json([
            'message' => 'Get discovery successful',
            'statusCode' => 200,
            'data' => [
                'most_listened_song' => $most_listened_song,
                'most_listened_album' => $most_listened_album,
                'playlist' => $playlist,
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

        $playlists = Playlist::with('user', 'tracks.song')->where('name', 'LIKE', "%{$keyword}%")->get();
        // filter public only and private with user_id
        $playlists = $playlists->filter(function ($value, $key) use ($user_id) {
            return $value['user_id'] == $user_id || $value['status'] == 'public';
        });

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
}