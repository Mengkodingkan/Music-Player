<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Genre;
use App\Models\Song;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SongManagementController extends Controller
{
    public function get_all_songs()
    {
        $songs = Song::all();
        $songs->load(['album', 'artist', 'genre']);

        foreach ($songs as $song) {
            $audio = urlencode($song['audio']);
            $audio = str_replace('+', '%20', $audio);

            $img = urlencode($song['image']);
            $img = str_replace('+', '%20', $img);

            $song['audio'] ? $song['audio'] = url('audio/' . $audio) : null;
            $song['image'] ? $song['image'] = url('images/song/' . $img) : null;
        }

        return response()->json([
            'message' => 'Get all songs successful',
            'statusCode' => 200,
            'data' => $songs,
        ], 200);
    }

    public function get_song_by_id($id)
    {
        $song = Song::with(['album', 'artist', 'genre'])->find($id);
        if (!$song) {
            return response()->json([
                'message' => 'Song not found',
                'statusCode' => 404,
            ], 404);
        }

        $song->makeHidden(['album_id', 'artist_id', 'genre_id']);

        $s = urlencode($song['audio']);
        $s = str_replace('+', '%20', $s);
        $song['audio'] ? $song['audio'] = url('audio/' . $s) : null;

        $img = urlencode($song['image']);
        $img = str_replace('+', '%20', $img);
        $song['image'] ? $song['image'] = url('images/song/' . $img) : null;

        return response()->json([
            'message' => 'Get song successful',
            'statusCode' => 200,
            'data' => $song,
        ], 200);
    }

    public function create_song(Request $request)
    {
        $data = $request->all();
        $v = Validator::make($data, [
            'title' => 'required|string',
            'image' => 'required|image|mimes:png,jpg,jpeg',
            'audio' => 'required|mimes:mpga,wav,mp3',
            'duration' => 'required|integer',
            'release_date' => 'required|date',
            'status' => 'in:pending,published,rejected|default:pending',
            'artist_id' => 'required|integer',
            'genre_id' => 'required|integer',
        ]);

        if ($v->fails()) {
            return response()->json([
                'message' => 'Invalid data',
                'statusCode' => 400,
            ], 400);
        }

        $artist = Artist::find($data['artist_id']);
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $album = $data['album_id'] ? Album::find($data['album_id']) : null;
        if (isset($data['album_id']) && !$album) {
            return response()->json([
                'message' => 'Album not found',
                'statusCode' => 404,
            ], 404);
        }

        $genre = Genre::find($data['genre_id']);
        if (!$genre) {
            return response()->json([
                'message' => 'Genre not found',
                'statusCode' => 404,
            ], 404);
        }

        $image = $request->file('image');
        $audio = $request->file('audio');

        $image_name = time() . '_' . $image->getClientOriginalName();
        $audio_name = time() . '_' . $audio->getClientOriginalName();

        $image->move(public_path('images/song'), $image_name);
        $audio->move(public_path('audio'), $audio_name);

        try {
            $data = $v->validated();

            $duration = gmdate('H:i:s', $data['duration']);
            $song = Song::create([
                'title' => $data['title'],
                'image' => $image_name,
                'audio' => $audio_name,
                'duration' => $duration,
                'release_date' => $data['release_date'],
                'status' => $data['status'] ?? 'pending',
                'artist_id' => $data['artist_id'],
                'album_id' => $data['album_id'] ?? null,
                'genre_id' => $data['genre_id'],
            ]);

            $song['audio'] ? $song['audio'] = url('audio/' . $song['audio']) : null;
            $song['image'] ? $song['image'] = url('images/song/' . $song['image']) : null;

            return response()->json([
                'message' => 'Create song successful',
                'statusCode' => 200,
                'data' => $song,
            ], 200);
        } catch (Exception $e) {
            if (file_exists(public_path('images/song/' . $image_name))) unlink(public_path('images/song/' . $image_name));
            if (file_exists(public_path('audio/' . $audio_name))) unlink(public_path('audio/' . $audio_name));

            return response()->json([
                'message' => 'Create song failed',
                'statusCode' => 500,
            ], 500);
        }
    }

    public function update_song(Request $request, $id) {
        $data = $request->all();
        $v = Validator::make($data, [
            'title' => 'string',
            'image' => 'image|mimes:png,jpg,jpeg',
            'duration' => 'integer',
            'release_date' => 'date',
            'status' => 'in:pending,published,rejected',
            'artist_id' => 'integer',
            'genre_id' => 'integer',
        ]);

        if ($v->fails()) {
            return response()->json([
                'message' => 'Invalid data',
                'statusCode' => 400,
            ], 400);
        }

        $song = Song::find($id);
        if (!$song) {
            return response()->json([
                'message' => 'Song not found',
                'statusCode' => 404,
            ], 404);
        }

        $artist = $data['artist_id'] ? Artist::find($data['artist_id']) : null;
        if (isset($data['artist_id']) && !$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $album = $data['album_id'] ? Album::find($data['album_id']) : null;
        if (isset($data['album_id']) && !$album) {
            return response()->json([
                'message' => 'Album not found',
                'statusCode' => 404,
            ], 404);
        }

        $genre = $data['genre_id'] ? Genre::find($data['genre_id']) : null;
        if (isset($data['genre_id']) && !$genre) {
            return response()->json([
                'message' => 'Genre not found',
                'statusCode' => 404,
            ], 404);
        }

        $image = $request->file('image');

        if ($image) {
            $image_name = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('images/song'), $image_name);
        }

        try {
            $data = $v->validated();

            $duration = $data['duration'] ? gmdate('H:i:s', $data['duration']) : null;
            $song->update([
                'title' => $data['title'] ?? $song->title,
                'image' => $image_name ?? $song->image,
                'audio' => $audio_name ?? $song->audio,
                'duration' => $duration ?? $song->duration,
                'release_date' => $data['release_date'] ?? $song->release_date,
                'status' => $data['status'] ?? $song->status,
                'artist_id' => $data['artist_id'] ?? $song->artist_id,
                'album_id' => $data['album_id'] ?? $song->album_id,
                'genre_id' => $data['genre_id'] ?? $song->genre_id,
            ]);

            $song['audio'] ? $song['audio'] = url('audio/' . $song['audio']) : null;
            $song['image'] ? $song['image'] = url('images/song/' . $song['image']) : null;

            return response()->json([
                'message' => 'Update song successful',
                'statusCode' => 200,
                'data' => $song,
            ], 200);
        } catch (Exception $e) {
            if (file_exists(public_path('images/song/' . $image_name))) unlink(public_path('images/song/' . $image_name));

            return response()->json([
                'message' => 'Update song failed',
                'statusCode' => 500,
            ], 500);
        }
    }

    public function delete_song($id) {
        $song = Song::find($id);
        if (!$song) {
            return response()->json([
                'message' => 'Song not found',
                'statusCode' => 404,
            ], 404);
        }

        try {
            $song->delete();

            $a = $song->album ?? null;
            if ($a && file_exists(public_path('images/album/' . $a->image))) unlink(public_path('images/album/' . $a->image));

            $b = $song->artist ?? null;
            if ($b && file_exists(public_path('images/artist/' . $b->image))) unlink(public_path('images/artist/' . $b->image));

            return response()->json([
                'message' => 'Delete song successful',
                'statusCode' => 200,
            ], 200);
        } catch (Exception $e) {
            var_dump($e->getMessage());die;
            return response()->json([
                'message' => 'Delete song failed',
                'statusCode' => 500,
            ], 500);
        }
    }

    public function approve_song($id) {
        $song = Song::find($id);
        if (!$song) {
            return response()->json([
                'message' => 'Song not found',
                'statusCode' => 404,
            ], 404);
        }

        // check if song already approved
        if ($song->status == 'published') {
            return response()->json([
                'message' => 'Song already approved',
                'statusCode' => 400,
            ], 400);
        }

        try {
            $song->update([
                'status' => 'published',
            ]);

            return response()->json([
                'message' => 'Approve song successful',
                'statusCode' => 200,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Approve song failed',
                'statusCode' => 500,
            ], 500);
        }
    }

    public function reject_song($id) {
        $song = Song::find($id);
        if (!$song) {
            return response()->json([
                'message' => 'Song not found',
                'statusCode' => 404,
            ], 404);
        }

        // check if song already rejected
        if ($song->status == 'rejected') {
            return response()->json([
                'message' => 'Song already rejected',
                'statusCode' => 400,
            ], 400);
        }

        try {
            $song->update([
                'status' => 'rejected',
            ]);

            return response()->json([
                'message' => 'Reject song successful',
                'statusCode' => 200,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Reject song failed',
                'statusCode' => 500,
            ], 500);
        }
    }
}