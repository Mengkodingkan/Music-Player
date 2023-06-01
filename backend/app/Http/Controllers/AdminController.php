<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Song;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function get_dashboard(Request $request)
    {
        $song_request = Song::where('status', 'pending')->count();
        $user_count = User::count();
        $artist = Artist::count();


        return response()->json([
            'message' => 'Get dashboard successful',
            'statusCode' => 200,
            'data' => [
                'song_request' => $song_request,
                'user_count' => $user_count,
                'artist' => $artist,
            ]
        ], 200);
    }
}
