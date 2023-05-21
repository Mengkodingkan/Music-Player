<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Album;
use App\Models\Artist;
use App\Models\Playlist;
use App\Models\TRX_Playlist;
use Exception;
use Illuminate\Support\Facades\Validator;

class AlbumManagementController extends Controller
{
    public function get_all_albums()
    {
        $albums = Album::with('artist', 'songs')->get();
        $albums->makeHidden('artist_id');
        $albums->load('songs.genre');

        foreach ($albums as $album) {
            $album['image'] = url('images/album/' . $album['image']);
            $album->songs->makeHidden(['artist_id', 'album_id', 'genre_id']);
        }

        return response()->json([
            'message' => 'Get all albums successful',
            'statusCode' => 200,
            'data' => $albums,
        ], 200);
    }

    public function get_album_by_id($id)
    {
        $album = Album::with('artist', 'songs')->find($id);
        if (!$album) {
            return response()->json([
                'message' => 'Album not found',
                'statusCode' => 404,
            ], 404);
        }

        $album->makeHidden('artist_id');
        $album->load('songs.genre');
        $album->songs->makeHidden(['artist_id', 'album_id', 'genre_id']);
        $album['image'] = url('images/album/' . $album['image']);

        return response()->json([
            'message' => 'Get album successful',
            'statusCode' => 200,
            'data' => $album,
        ], 200);
    }

    public function create_album(Request $request)
    {
        $data = $request->all();
        $v = Validator::make($data, [
            'title' => 'required|string',
            'image' => 'required|image|mimes:png,jpg,jpeg',
            'release_date' => 'required|date',
            'category' => 'in:album,single,ep',
            'artist_id' => 'required|integer',
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

        $image = $request->file('image');
        $image_name = time() . '.' . $image->extension();
        $image->move(public_path('images/album'), $image_name);
        $data['image'] = $image_name;

        try {
            $album = Album::create($data);
            $album['image'] = url('images/album/' . $album['image']);
            return response()->json([
                'message' => 'Create album successful',
                'statusCode' => 201,
                'data' => $album,
            ], 201);
        } catch (Exception $e) {
            unlink(public_path('images/album/' . $image_name));
            return response()->json([
                'message' => 'Create album failed',
                'statusCode' => 500,
            ], 500);
        }
    }

    public function update_album(Request $request, $id) {
        $data = $request->all();
        $v = Validator::make($data, [
            'title' => 'string',
            'image' => 'image|mimes:png,jpg,jpeg',
            'release_date' => 'date',
            'category' => 'in:album,single,ep',
            'artist_id' => 'integer',
            '__method' => 'required|in:PUT,PATCH',
        ]);

        if ($v->fails()) {
            return response()->json([
                    'message' => 'Invalid data',
                    'statusCode' => 400,
            ], 400);
        }

        $album = Album::find($id);
        if (!$album) {
            return response()->json([
                'message' => 'Album not found',
                'statusCode' => 404,
            ], 404);
        }

        $image = $request->file('image');
        if ($image->isValid()) {
            $img_name = time() . '.' . $image->extension();
            $image->move(public_path('images/album'), $img_name);
            $data['image'] = $img_name;

            // delete old image
            unlink(public_path('images/album/' . $album->image));
        }

        try {
            $album->update($data);
            $album['image'] = url('images/album/' . $album['image']);
            return response()->json([
                'message' => 'Update album successful',
                'statusCode' => 200,
                'data' => $album,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Update album failed',
                'statusCode' => 500,
            ], 500);
        }
    }

    public function delete_album($id) {
        $album = Album::find($id);
        if (!$album) {
            return response()->json([
                'message' => 'Album not found',
                'statusCode' => 404,
            ], 404);
        }

        // check this album included in song
        $songs = $album->songs;
        if (count($songs) > 0) {
            return response()->json([
                'message' => 'Album included in song, set song album to null first',
                'statusCode' => 400,
            ], 400);
        }

        try {
            $album->delete();
            unlink(public_path('images/album/' . $album->image));
            return response()->json([
                'message' => 'Delete album successful',
                'statusCode' => 200,
            ], 200);
        } catch (Exception $e) {
            var_dump($e->getMessage());
            return response()->json([
                'message' => 'Delete album failed',
                'statusCode' => 500,
            ], 500);
        }
    }
}