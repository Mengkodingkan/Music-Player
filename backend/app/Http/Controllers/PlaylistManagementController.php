<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use App\Models\TRX_Playlist;
use Illuminate\Http\Request;

class PlaylistManagementController extends Controller
{
    public function get_all_playlists()
    {
        $playlists = Playlist::all();
        $playlists->load(['user', 'tracks']);

        foreach ($playlists as $playlist) {
            $playlist['image'] ? $playlist['image'] = url('images/playlist/' . $playlist['image']) : null;
        }

        $playlist->makeHidden(['user_id']);
        return response()->json([
            'message' => 'Get all playlists successful',
            'statusCode' => 200,
            'data' => $playlists,
        ], 200);
    }

    public function get_playlist_by_id(Request $request, $id)
    {
        $playlist = Playlist::find($id);
        if(!$playlist) {
            return response()->json([
                'message' => 'Playlist not found',
                'statusCode' => 404,
            ], 404);
        }
        $playlist->load(['user', 'tracks']);
        $playlist->makeHidden(['user_id']);

        return response()->json([
            'message' => 'Get playlist by id successful',
            'statusCode' => 200,
            'data' => $playlist,
        ], 200);
    }
}