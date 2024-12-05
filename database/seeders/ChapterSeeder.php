<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseChapter;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ChapterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // CourseChapter::factory()->count(100)->create();

        // Fetch all course IDs
        $courseIds = Course::pluck('id');

        foreach ($courseIds as $courseId) {
            // Define the number of chapters to create for this course
            $chapterCount = fake()->numberBetween(3, 10);

            // Manually increment the order for each chapter
            for ($i = 1; $i <= $chapterCount; $i++) {
                CourseChapter::factory()->create([
                    'course_id' => $courseId,
                    'order' => $i, // Explicitly set the incrementing order
                ]);
            }
        }
    }
}
