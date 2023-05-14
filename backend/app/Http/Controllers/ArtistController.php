<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ArtistController extends Controller
{
    public function register(Request $request) {
        $user = $request['userauth'];
        $user_id = $user->id;

        $user = Artist::where('user_id', $user_id)->first();
        if ($user) {
            return response()->json([
                'message' => 'User already registered as artist',
                'statusCode' => 400,
            ], 400);
        }

        $v = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:artists,email',
            'image' => 'required|mimes:jpg,jpeg,png',
            'instagram' => 'required|string',
            'facebook' => 'required|string',
            'twitter' => 'required|string',
            'website' => 'required|string',
            'about' => 'required|string',
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
            $artist->instagram = $request['instagram'];
            $artist->facebook = $request['facebook'];
            $artist->twitter = $request['twitter'];
            $artist->website = $request['website'];
            $artist->about = $request['about'];
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
}
