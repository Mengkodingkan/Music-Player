<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserManagementController extends Controller
{
    public function get_all_users() {
        return response()->json([
            'message' => 'Get all users successful',
            'statusCode' => 200,
            'data' => User::all(),
        ], 200);
    }

    public function get_user_by_id($id) {
        $user = User::findOrFail($id);
        if (!$user) {
            return response()->json([
                'message' => 'User not found',
                'statusCode' => 404,
            ], 404);
        }

        return response()->json([
            'message' => 'Get user successful',
            'statusCode' => 200,
            'data' => $user,
        ], 200);
    }

    public function create_user(Request $request) {
        $data = $request->all();
        $v = Validator::make($data, [
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string',
            'birthday' => 'required|date',
            'role' => 'required|in:admin,user',
        ]);

        if ($v->fails()) {
            return response()->json([
                'message' => 'Invalid data',
                'statusCode' => 400,
            ], 400);
        }

        $user = User::create($data);

        return response()->json([
            'message' => 'Create user successful',
            'statusCode' => 201,
            'data' => $user,
        ], 201);
    }

    public function update(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->update($request->all());

        return $user;
    }

    public function delete(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->delete();

        return 204;
    }
}