<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\Artist;
use App\Models\Song;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard(): JsonResponse
    {
        $countSongRequest = Song::where('status', 'pending')->count();
        $countArtist = Artist::count();
        $countUser = User::where('role', 'user')->count();

        return response()->json([
            'message' => 'Successfully get dashboard data',
            'data' => [
                'songRequest' => $countSongRequest,
                'userCount' => $countUser,
                'artistCount' => $countArtist
            ]
        ], 200);
    }

    public function getPendingSong()
    {
        $songs = Song::where('status', 'pending')->get();
        $album = Album::whereIn('id', $songs->pluck('album_id'))->get();
        $artist = Artist::whereIn('id', $album->pluck('artist_id'))->get();

        $data = [];
        foreach ($songs as $song) {
            $data[] = [
                'id' => $song->id,
                'title' => $song->title,
                'duration' => $song->duration,
                'audioUrl' => url($song->audio_path),
                'status' => $song->status,
                'album' => [
                    'id' => $album->where('id', $song->album_id)->first()->id,
                    'title' => $album->where('id', $song->album_id)->first()->title,
                    'image' => url($album->where('id', $song->album_id)->first()->image),
                    'artist' => [
                        'id' => $artist->where('id', $album->where('id', $song->album_id)->first()->artist_id)->first()->id,
                        'fullName' => $artist->where('id', $album->where('id', $song->album_id)->first()->artist_id)->first()->full_name,
                    ]
                ]
            ];
        }

        return response()->json([
            'message' => 'Successfully get pending song',
            'data' => $data
        ], 200);
    }

    public function approve($songId): JsonResponse
    {
        $song = Song::where('id', $songId)->update([
            'status' => 'published'
        ]);
        return response()->json([
            'message' => 'Successfully approved song',
            'data' => $song
        ], 201);
    }

    public function reject($songId): JsonResponse
    {
        $song = Song::where('id', $songId)->update([
            'status' => 'rejected'
        ]);
        return response()->json([
            'message' => 'Successfully rejected song',
            'data' => $song
        ], 201);
    }
}
