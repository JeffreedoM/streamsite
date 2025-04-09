<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $allUsers = User::all();

        foreach ($allUsers as $user) {
            $user->courses()->attach(1, [
                'enrolled_at' => now(),
                'expiration_date' => now()->addYear(),
                'status' => 1,
            ]);
        }
    }
}
