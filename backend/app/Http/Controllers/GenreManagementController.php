<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Genre;
use Illuminate\Support\Facades\Validator;

class GenreManagementController extends Controller
{
    public function get_all_genres()
    {
        $genres = Genre::all();
        return response()->json([
            'message' => 'Get all genres successful',
            'statusCode' => 200,
            'data' => $genres,
        ], 200);
    }

    public function get_genre_by_id($id)
    {
        $genre = Genre::find($id);
        if (!$genre) {
            return response()->json([
                'message' => 'Genre not found',
                'statusCode' => 404,
            ], 404);
        }

        return response()->json([
            'message' => 'Get genre successful',
            'statusCode' => 200,
            'data' => $genre,
        ], 200);
    }

    public function create_genre(Request $request)
    {
        $data = $request->all();
        $v = Validator::make($data, [
            'name' => 'required|string',
        ]);

        if ($v->fails()) {
            return response()->json([
                'message' => 'Invalid data',
                'statusCode' => 400,
            ], 400);
        }

        $genre = Genre::create($data);
        return response()->json([
            'message' => 'Create genre successful',
            'statusCode' => 200,
            'data' => $genre,
        ], 200);
    }

    public function update_genre(Request $request, $id)
    {
        $data = $request->all();
        $v = Validator::make($data, [
            'name' => 'string',
        ]);

        if ($v->fails()) {
            return response()->json([
                'message' => 'Invalid data',
                'statusCode' => 400,
            ], 400);
        }

        $genre = Genre::find($id);
        if (!$genre) {
            return response()->json([
                'message' => 'Genre not found',
                'statusCode' => 404,
            ], 404);
        }

        $genre->update($data);
        return response()->json([
            'message' => 'Update genre successful',
            'statusCode' => 200,
            'data' => $genre,
        ], 200);
    }

    public function delete_genre($id)
    {
        $genre = Genre::find($id);
        if (!$genre) {
            return response()->json([
                'message' => 'Genre not found',
                'statusCode' => 404,
            ], 404);
        }

        $genre->delete();
        return response()->json([
            'message' => 'Delete genre successful',
            'statusCode' => 200,
        ], 200);
    }
}