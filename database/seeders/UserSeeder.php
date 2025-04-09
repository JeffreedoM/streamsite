<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Manual seed
        User::create([
            'name' => 'Jeep',
            'email' => 'jeffreedomtabz@gmail.com',
            'google_id' => "107010632077764196266", // looks like a legit Google ID-ish
            'email_verified_at' => now(),
            'avatar' => "https://lh3.googleusercontent.com/a/ACg8ocKjELRtYSaXHcVnH5NdFfKVdOLS-GVpBfi3fEa8k5tk647Ql7s=s96-c",
            'password' => "",
            'roles' => '["student", "teacher"]',

        ]);

        // Number of users you want to generate
        $count = 10;


        for ($i = 0; $i < $count; $i++) {
            User::create([
                'name' => fake()->name(),
                'email' => fake()->unique()->safeEmail(),
                'google_id' => Str::uuid(), // looks like a legit Google ID-ish
                'email_verified_at' => now(),
                'avatar' => fake()->imageUrl(200, 200, 'people', true, 'User'),
                'password' => bcrypt('secret123'),
                'roles' => '["student"]',
            ]);
        }
    }
}
