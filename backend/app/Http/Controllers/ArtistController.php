<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Genre;
use App\Models\Song;
use DateTime;
use Exception;

use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Crisu83\ShortId\ShortId;

class ArtistController extends Controller
{
    public function register(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $user = Artist::where('user_id', $user_id)->first();
        if ($user) {
            return response()->json([
                'message' => 'User already registered as artist',
                'statusCode' => 400,
            ], 400);
        }

        $v = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:artist,email',
            'image' => 'required|mimes:jpg,jpeg,png',
        ]);

        if ($v->fails()) {
            return response()->json([
                'message' => 'Invalid credentials',
                'statusCode' => 400,
            ], 400);
        }

        $image = $request->file('image');
        $image_name = time() . '.' . $image->extension();
        $image->move(public_path('images/artist'), $image_name);

        try {
            $artist = new Artist();
            $artist->user_id = $user_id;
            $artist->name = $request['name'];
            $artist->email = $request['email'];
            $artist->image = $image_name;
            $artist->instagram = $request['instagram'] ?? null;
            $artist->facebook = $request['facebook'] ?? null;
            $artist->twitter = $request['twitter'] ?? null;
            $artist->website = $request['website'] ?? null;
            $artist->about = $request['about'] ?? null;
            $artist->save();

            return response()->json([
                'message' => 'Register successful',
                'statusCode' => 200,
            ], 200);

        } catch (\Exception $e) {
            if (file_exists(public_path('images/artist/' . $image_name))) {
                unlink(public_path('images/artist/' . $image_name));
            }
            return response()->json([
                'message' => 'Register failed',
                'statusCode' => 500,
            ], 500);
        }
    }

    public function get_followers(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Artist::where('user_id', $user_id)->first();
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $followers = $artist->load('followers');

        return response()->json([
            'message' => 'Get followers successful',
            'statusCode' => 200,
            'data' => $followers,
        ], 200);
    }

    public function get_follower_by_id(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Artist::where('user_id', $user_id)->first();
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $follower = $artist->followers()->where('user_id', $id)->first();
        if (!$follower) {
            return response()->json([
                'message' => 'Follower not found',
                'statusCode' => 404,
            ], 404);
        }

        return response()->json([
            'message' => 'Get follower successful',
            'statusCode' => 200,
            'data' => $follower,
        ], 200);
    }

    public function get_all_albums(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Artist::where('user_id', $user_id)->first();
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $albums = $artist->albums()->get();

        return response()->json([
            'message' => 'Get all albums successful',
            'statusCode' => 200,
            'data' => $albums,
        ], 200);
    }

    public function get_album_by_id(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Artist::where('user_id', $user_id)->first();
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $album = $artist->albums()->where('id', $id)->first();
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

    public function create_album(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Artist::where('user_id', $user_id)->first();
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $v = Validator::make($request->all(), [
            'title' => 'required|string',
            'category' => 'required|in:album,single,ep',
            'image' => 'required|mimes:jpg,jpeg,png',
            'release_date' => 'required|date',
        ]);

        if ($v->fails()) {
            return response()->json([
                'message' => 'Invalid credentials',
                'statusCode' => 400,
            ], 400);
        }

        $image = $request->file('image');
        $image_name = time() . '.' . $image->extension();
        $image->move(public_path('images/album'), $image_name);

        try {
            $album = new Album();
            $album->artist_id = $artist->id;
            $album->title = $request['title'];
            $album->category = $request['category'];
            $album->image = $image_name;
            $album->release_date = $request['release_date'];
            $album->save();

            return response()->json([
                'message' => 'Create album successful',
                'statusCode' => 200,
            ], 200);

        } catch (Exception $e) {
            if (file_exists(public_path('images/album/' . $image_name))) {
                unlink(public_path('images/album/' . $image_name));
            }
            return response()->json([
                'message' => 'Create album failed',
                'statusCode' => 500,
            ], 500);
        }
    }

    public function update_album(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Artist::where('user_id', $user_id)->first();
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $album = $artist->albums()->where('id', $id)->first();
        if (!$album) {
            return response()->json([
                'message' => 'Album not found',
                'statusCode' => 404,
            ], 404);
        }

        $v = Validator::make($request->all(), [
            'title' => 'string',
            'category' => 'in:album,single,ep',
            'image' => 'mimes:jpg,jpeg,png',
            'release_date' => 'date',
            '__method' => 'required|in:PUT,PATCH'
        ]);

        if ($v->fails()) {
            return response()->json([
                'message' => 'Invalid credentials',
                'statusCode' => 400,
            ], 400);
        }

        $hasImage = $request->hasFile('image');
        if ($hasImage) {
            $image = $request->file('image');
            $image_name = time() . '.' . $image->extension();
            $image->move(public_path('images/album'), $image_name);

            if (file_exists(public_path('images/album/' . $album->image))) {
                unlink(public_path('images/album/' . $album->image));
            }

        }

        try {
            $album->title = $request['title'];
            $album->category = $request['category'];
            $album->release_date = $request['release_date'];
            $hasImage ? $album->image = $image_name : null;
            $album->save();

            return response()->json([
                'message' => 'Update album successful',
                'statusCode' => 200,
            ], 200);

        } catch (Exception $e) {
            if ($hasImage) {
                if (file_exists(public_path('images/album/' . $image_name))) {
                    unlink(public_path('images/album/' . $image_name));
                }
            }
            return response()->json([
                'message' => 'Update album failed',
                'statusCode' => 500,
            ], 500);
        }
    }

    public function delete_album(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Artist::where('user_id', $user_id)->first();
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $album = $artist->albums()->where('id', $id)->first();
        if (!$album) {
            return response()->json([
                'message' => 'Album not found',
                'statusCode' => 404,
            ], 404);
        }

        try {
            $album->delete();

            if (file_exists(public_path('images/album/' . $album->image))) {
                unlink(public_path('images/album/' . $album->image));
            }

            return response()->json([
                'message' => 'Delete album successful',
                'statusCode' => 200,
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Delete album failed',
                'statusCode' => 500,
            ], 500);
        }
    }

    public function get_all_songs(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Artist::where('user_id', $user_id)->first();
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $songs = $artist->songs()->get();
        $songs->load('album', 'genre', 'artist');

        return response()->json([
            'message' => 'Get all songs successful',
            'statusCode' => 200,
            'data' => $songs,
        ], 200);
    }

    public function get_song_by_id(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Artist::where('user_id', $user_id)->first();
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $song = $artist->songs()->where('id', $id)->first();
        if (!$song) {
            return response()->json([
                'message' => 'Song not found',
                'statusCode' => 404,
            ], 404);
        }

        $song->load('album', 'genre', 'artist');

        return response()->json([
            'message' => 'Get song by id successful',
            'statusCode' => 200,
            'data' => $song,
        ], 200);
    }

    public function create_song(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Artist::where('user_id', $user_id)->first();
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $date = new DateTime();
        $v = Validator::make($request->all(), [
            'title' => 'required|string',
            'image' => 'required|mimes:jpg,jpeg,png',
            'genre_id' => 'required|exists:genre,id',
            'album_id' => 'exists:albums,id|default:null',
            'audio' => 'required|mimes:mpga,wav,ogg,mp3'
        ]);

        if ($v->fails()) {
            return response()->json([
                'message' => 'Invalid credentials',
                'statusCode' => 400,
            ], 400);
        }

        // check if album exist
        if ($request['album_id']) {
            $album = $artist->albums()->where('id', $request['album_id'])->first();
            if (!$album) {
                return response()->json([
                    'message' => 'Album not found',
                    'statusCode' => 404,
                ], 404);
            }
        }

        // check if genre exist
        $genre = Genre::where('id', $request['genre_id'])->first();
        if (!$genre) {
            return response()->json([
                'message' => 'Genre not found',
                'statusCode' => 404,
            ], 404);
        }

        $audio = $request->file('audio');
        $audio_name = time() . '.' . $audio->extension();
        $audio->move(public_path('audio'), $audio_name);

        $image = $request->file('image');
        $image_name = time() . '.' . $image->extension();
        $image->move(public_path('images/song'), $image_name);

        $shortid = ShortId::create();
        try {
            $song = new Song();
            $song->s_id = $shortid->generate();
            $song->title = $request['title'];
            $song->release_date = $request['release_date'] ?? $date->format('Y-m-d');
            $song->genre_id = $request['genre_id'];
            $song->album_id = $request['album_id'];
            $song->artist_id = $artist->id;
            $song->audio = $audio_name;
            $song->image = $image_name;
            $song->status = 'pending';

            // get duration of audio
            $duration = FFMpeg::fromDisk('audio')->open($audio_name)->getDurationInSeconds();
            $song->duration = $duration;

            $song->save();

            return response()->json([
                'message' => 'Create song successful',
                'statusCode' => 200,
            ], 200);
        } catch (Exception $e) {
            var_dump($e->getMessage());
            if (file_exists(public_path('audio/' . $audio_name))) unlink(public_path('audio/' . $audio_name));
            if (file_exists(public_path('images/song/' . $image_name))) unlink(public_path('images/song/' . $image_name));
            return response()->json([
                'message' => 'Create song failed',
                'statusCode' => 500,
            ], 500);
        }
    }

    public function delete_song(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Artist::where('user_id', $user_id)->first();
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $song = $artist->songs()->where('id', $id)->first();
        if (!$song) {
            return response()->json([
                'message' => 'Song not found',
                'statusCode' => 404,
            ], 404);
        }

        try {
            $song->delete();

            if (file_exists(public_path('audio/' . $song->audio))) {
                unlink(public_path('audio/' . $song->audio));
            }

            if (file_exists(public_path('images/song/' . $song->image))) {
                unlink(public_path('images/song/' . $song->image));
            }

            return response()->json([
                'message' => 'Delete song successful',
                'statusCode' => 200,
            ], 200);

        } catch (Exception $e) {
            var_dump($e->getMessage());
            return response()->json([
                'message' => 'Delete song failed',
                'statusCode' => 500,
            ], 500);
        }
    }
}
