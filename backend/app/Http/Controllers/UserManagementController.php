<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserManagementController extends Controller
{
    public function get_all_users(Request $request)
    {
        // get query role from url
        $query = $request->query('role');
        $users = User::where('role', $query)->get();

        return response()->json([
            'message' => 'Get all users successful',
            'statusCode' => 200,
            'data' => $users,
        ], 200);
    }

    public function get_user_by_id($id)
    {
        $user = User::find($id);
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

    public function create_user(Request $request)
    {
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

        $email_exists = User::where('email', $data['email'])->first();
        if ($email_exists) {
            return response()->json([
                'message' => 'Email already exists',
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

    public function update_user(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'User not found',
                'statusCode' => 404,
            ], 404);
        }

        $v = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string',
            'birthday' => 'required|date',
            'role' => 'required|in:admin,user'
        ]);

        if ($v->fails()) {
            return response()->json([
                'message' => 'Invalid data',
                'statusCode' => 400,
            ], 400);
        }

        if ($user->email != $request->email) {
            $email_exists = User::where('email', $request->email)->first();
            if ($email_exists) {
                return response()->json([
                    'message' => 'Email already exists',
                    'statusCode' => 400,
                ], 400);
            }
        }

        $user->update($request->all());
        return response()->json([
            'message' => 'Update user successful',
            'statusCode' => 200,
            'data' => $user,
        ], 200);
    }

    public function delete_user(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'User not found',
                'statusCode' => 404,
            ], 404);
        }

        // if user same with token user
        if ($user->id == $request->userauth['id']) {
            return response()->json([
                'message' => 'You cannot delete yourself',
                'statusCode' => 400,
            ], 400);
        }

        $user->delete();

        return response()->json([
            'message' => 'Delete user successful',
            'statusCode' => 200,
        ], 200);
    }
}
