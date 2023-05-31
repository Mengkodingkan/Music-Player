<?php

namespace App\Http\Controllers;

use App\Models\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request) {
        try {
            $v = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            if ($v->fails()) {
                return response()->json([
                    'message' => 'Invalid credentials',
                    'statusCode' => 400,
                ], 400);
            }

            if (!Auth::attempt($v->validated())) return response()->json([
                'message' => 'Email or password is incorrect',
                'statusCode' => 400,
            ], 400);

            $payload = [
                'id' => Auth::user()->id,
                'name' => Auth::user()->name,
                'role' => strtolower(Auth::user()->role),
                'iat' => time(),
                'exp' => time() + 60 * 60 * 24 * 7,
            ];

            $token = JWT::encode($payload, env('JWT_SECRET'), 'HS256');
            return response()->json([
                'message' => 'Login successful',
                'statusCode' => 200,
                'token' => $token,
                'role' => strtolower(Auth::user()->role),
            ], 200);
        } catch (\Exception $e) {
            var_dump($e->getMessage());
            return response()->json([
                'message' => 'Login failed',
                'statusCode' => 500,
            ], 500);
        }
    }

    public function register(Request $request) {
        try {
            $v = Validator::make($request->all(), [
                'name' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'birthday' => 'required|date',
                'password' => 'required|string',
                'role' => 'required|string|in:artist,user',
            ]);

            if ($v->fails()) {
                return response()->json([
                    'message' => $v->errors()->first(),
                    'statusCode' => 400,
                ], 400);
            }

            // get if user already exists
            $user = User::where('email', $request->email)->first();
            if ($user) {
                return response()->json([
                    'message' => 'Email already exists',
                    'statusCode' => 400,
                ], 400);
            }

            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;

            $user->role = $request->role;
            $user->password = $request->password;
            $user->save();

            return response()->json([
                'message' => 'Register successful',
                'statusCode' => 200,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Register failed',
                'statusCode' => 500,
            ], 500);
        }
    }
}