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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to the API',
        'statusCode' => 200,
    ], 200);
});

Route::post('/auth', 'App\Http\Controllers\AuthController@login');
Route::middleware('api.admin')->prefix('/admin')->group(function () {
    Route::get('/', function () {
        return response()->json([
            'message' => 'Welcome to the admin API',
            'statusCode' => 200,
        ], 200);
    });

    Route::prefix('/users')->group(function () {
        Route::get('/', 'App\Http\Controllers\UserManagementController@get_all_users');
        Route::get('/{id}', 'App\Http\Controllers\UserManagementController@get_user_by_id');
        Route::post('/', 'App\Http\Controllers\UserManagementController@create_user');
        Route::put('/{id}', 'App\Http\Controllers\UserManagementController@update_user');
        Route::delete('/{id}', 'App\Http\Controllers\UserManagementController@delete_user');
    });
});
