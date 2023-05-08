<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artist;
use Exception;
use Illuminate\Support\Facades\Validator;
use PDO;

use function GuzzleHttp\Promise\unwrap;

class ArtistManagementController extends Controller
{
    public function get_all_artists()
    {
        $artists = Artist::all();
        return response()->json([
            'message' => 'Get all artists successful',
            'statusCode' => 200,
            'data' => $artists,
        ], 200);
    }

    public function get_artist_by_id($id)
    {
        $artist = Artist::find($id);
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        return response()->json([
            'message' => 'Get artist successful',
            'statusCode' => 200,
            'data' => $artist,
        ], 200);
    }

    public function create_artist(Request $request)
    {
        $data = $request->all();
        $v = Validator::make($data, [
            'name' => 'required|string',
            'email' => 'required|email',
            'website' => 'required|string',
            'image' => 'required|image|mimes:png,jpg,jpeg',
        ]);

        if ($v->fails()) {
            return response()->json([
                    'message' => 'Invalid data',
                    'statusCode' => 400,
            ], 400);
        }


        $email_exists = Artist::where('email', $data['email'])->first();
        if ($email_exists) {
            return response()->json([
                'message' => 'Email already exists',
                'statusCode' => 400,
            ], 400);
        }

        $thumb = $request->file('image');
        $thumb_name = time() . '.' . $thumb->getClientOriginalExtension();
        $thumb->move(public_path('images'), $thumb_name);
        $data['image'] = $thumb_name;

        try {
            $artist = Artist::create($data);
            return response()->json([
                'message' => 'Create artist successful',
                'statusCode' => 201,
                'data' => $artist,
            ], 201);
        } catch (Exception $e) {
            // delete temp image
            $thumb_path = public_path('images') . '/' . $thumb_name;
            unlink($thumb_path);

            return response()->json([
                'message' => 'Create artist failed: ' . $e->getMessage(),
                'statusCode' => 500,
            ], 500);
        }
    }

    public function update_artist(Request $request, $id)
    {
        $data = $request->all();
        $artist = Artist::find($id);
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $v = Validator::make($data, [
            'name' => 'required|string',
            'email' => 'required|email',
            'website' => 'required|string',
            'image' => 'required|image|mimes:png',
        ]);

        if ($v->fails()) {
            return response()->json([
                'message' => 'Invalid data',
                'statusCode' => 400,
            ], 400);
        }

        $email_exists = Artist::where('email', $data['email'])->first();
        if ($email_exists && $email_exists->id != $id) {
            return response()->json([
                'message' => 'Email already exists',
                'statusCode' => 400,
            ], 400);
        }

        // delete old image
        $old_image = $artist->image;
        $old_image_path = public_path('images') . '/' . $old_image;
        unlink($old_image_path);

        $thumb = $request->file('image');
        $thumb_name = time() . '.' . $thumb->getClientOriginalExtension();
        $thumb->move(public_path('images'), $thumb_name);
        $data['image'] = $thumb_name;

        $artist->update($data);
        return response()->json([
            'message' => 'Update artist successful',
            'statusCode' => 200,
            'data' => $artist,
        ], 200);
    }

    public function delete_artist($id)
    {
        $artist = Artist::find($id);
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $artist->delete();
        return response()->json([
            'message' => 'Delete artist successful',
            'statusCode' => 200,
        ], 200);
    }
}
