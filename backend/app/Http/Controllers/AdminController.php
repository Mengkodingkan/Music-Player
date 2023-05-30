<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Artist;
use App\Models\Song;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard(): JsonResponse
    {
        $totalSongRequest = Song::where('status', 'pending')->count();
        $totalUsers = User::where('role', 'user')->count();
        $totalArtist = User::where('role', 'artist')->count();

        return response()->json([
            'data' => [
                'totalSongRequest' => $totalSongRequest,
                'totalUser' => $totalUsers,
                'totalArtist' => $totalArtist
            ]
        ]);
    }

    public function getAllUsers(): JsonResponse
    {
        return response()->json([
            'message' => 'Get all users successful',
            'statusCode' => 200,
            'data' => User::where('role', 'user')->get(),
        ]);
    }
}
