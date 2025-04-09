<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Manual seed
        Course::create([
            'course_title' => 'App Development',
            'course_description' => 'Learn App Development from Scratch',
            'course_image' => "course_images/7M5lKUORXlHxYUheGzfpRfuiMyvVFCQGYqnku7Pb.png", // looks like a legit Google ID-ish
            'password' => "pass123",
            'status' => "published",
        ]);

        Course::factory()->count(20)->create();
    }
}
