<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\Request;

class SongManagementController extends Controller
{
    public function get_all_songs()
    {
        $songs = Song::all();
        $songs->load(['album', 'artist', 'genre']);

        foreach ($songs as $song) {
            $song['audio'] ? $song['audio'] = url('audio/' . $song['audio']) : null;
            $song['thumbnail'] ? $song['thumbnail'] = url('images/song/' . $song['thumbnail']) : null;
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
        $song['audio'] ? $song['audio'] = url('audio/' . $song['audio']) : null;
        $song['thumbnail'] ? $song['thumbnail'] = url('images/song/' . $song['thumbnail']) : null;

        return response()->json([
            'message' => 'Get song successful',
            'statusCode' => 200,
            'data' => $song,
        ], 200);
    }
}
