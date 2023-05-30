<?php

namespace App\Http\Controllers;

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

            if (!Auth::attempt($v->validated()))
                return response()->json([
                'message' => 'Email or password is incorrect',
                'statusCode' => 400,
            ], 400);

            $payload = [
                'id' => Auth::user()->id,
                'full_name' => Auth::user()->full_name,
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
            ]);
        } catch (\Exception $e) {
            var_dump($e->getMessage());
            return response()->json([
                'message' => 'Login failed',
                'statusCode' => 500,
            ], 500);
        }
    }
}
