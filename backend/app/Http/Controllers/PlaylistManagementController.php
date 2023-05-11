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
        $playlists->load(['user', 'trx_playlist.song']);

        foreach ($playlists as $playlist) {
            $playlist['image'] ? $playlist['image'] = url('images/playlist/' . $playlist['image']) : null;
        }

        $playlist['tracks'] = $playlist['trx_playlist'];
        $playlist->makeHidden(['user_id', 'trx_playlist']);
        return response()->json([
            'message' => 'Get all playlists successful',
            'statusCode' => 200,
            'data' => $playlists,
        ], 200);
    }
}
