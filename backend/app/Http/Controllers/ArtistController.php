<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ArtistController extends Controller
{
    public function register(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $user = Artist::where('user_id', $user_id)->first();
        if ($user) {
            return response()->json([
                'message' => 'User already registered as artist',
                'statusCode' => 400,
            ], 400);
        }

        $v = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:artist,email',
            'image' => 'required|mimes:jpg,jpeg,png',
        ]);

        if ($v->fails()) {
            return response()->json([
                'message' => 'Invalid credentials',
                'statusCode' => 400,
            ], 400);
        }

        $image = $request->file('image');
        $image_name = time() . '.' . $image->extension();
        $image->move(public_path('images/artist'), $image_name);

        try {
            $artist = new Artist();
            $artist->user_id = $user_id;
            $artist->name = $request['name'];
            $artist->email = $request['email'];
            $artist->image = $image_name;
            $artist->instagram = $request['instagram'] ?? null;
            $artist->facebook = $request['facebook'] ?? null;
            $artist->twitter = $request['twitter'] ?? null;
            $artist->website = $request['website'] ?? null;
            $artist->about = $request['about'] ?? null;
            $artist->save();

            return response()->json([
                'message' => 'Register successful',
                'statusCode' => 200,
            ], 200);

        } catch (\Exception $e) {
            if (file_exists(public_path('images/artist/' . $image_name))) {
                unlink(public_path('images/artist/' . $image_name));
            }
            return response()->json([
                'message' => 'Register failed',
                'statusCode' => 500,
            ], 500);
        }
    }

    public function get_followers(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Artist::where('user_id', $user_id)->first();
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $followers = $artist->load('followers');

        return response()->json([
            'message' => 'Get followers successful',
            'statusCode' => 200,
            'data' => $followers,
        ], 200);
    }

    public function get_follower_by_id(Request $request, $id) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Artist::where('user_id', $user_id)->first();
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $follower = $artist->followers()->where('user_id', $id)->first();
        if (!$follower) {
            return response()->json([
                'message' => 'Follower not found',
                'statusCode' => 404,
            ], 404);
        }

        return response()->json([
            'message' => 'Get follower successful',
            'statusCode' => 200,
            'data' => $follower,
        ], 200);
    }

    public function get_all_albums(Request $request) {
        $user = $request['userauth'];
        $user_id = $user['id'];

        $artist = Artist::where('user_id', $user_id)->first();
        if (!$artist) {
            return response()->json([
                'message' => 'Artist not found',
                'statusCode' => 404,
            ], 404);
        }

        $albums = $artist->albums()->get();

        return response()->json([
            'message' => 'Get all albums successful',
            'statusCode' => 200,
            'data' => $albums,
        ], 200);
    }
}
