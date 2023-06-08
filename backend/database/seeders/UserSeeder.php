<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'full_name' => 'Admin',
            'email' => 'admin@coba.com',
            'password' => 'admin',
            'role' => 'admin',
            'image' => 'default.png',
        ]);

        User::factory()->count(50)->create();
    }
}
