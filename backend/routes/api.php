<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to the API',
        'statusCode' => 200,
    ], 200);
});

Route::post('/auth', 'App\Http\Controllers\AuthController@login');

Route::middleware('api.user')->group(function () {
    Route::get('/user', 'App\Http\Controllers\UserController@getUser');
    Route::post('/user', 'App\Http\Controllers\UserController@createUser');
    Route::put('/user', 'App\Http\Controllers\UserController@updateUser');
    Route::delete('/user', 'App\Http\Controllers\UserController@deleteUser');
});