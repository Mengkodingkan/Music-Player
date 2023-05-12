<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Artist;
use App\Models\Album;
use App\Models\Song;

class UserController extends Controller
{
    public function get_discovery(Request $request)
    {
        $user = $request['userauth'];
        $user_id = $user->id;

        $artists = Artist::all();
        $albums = Album::all();
        $songs = Song::all();

        $response = [
            'artists' => $artists,
            'albums' => $albums,
            'songs' => $songs,
        ];

        return response()->json($response, 200);
    }
}