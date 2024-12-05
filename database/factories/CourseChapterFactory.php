<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\CourseChapter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CourseChapterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Fetch a random course_id from the existing courses in the database
        $courseId = Course::inRandomOrder()->value('id');

        // Calculate the current maximum order for this course_id at runtime
        $currentOrder = CourseChapter::where('course_id', $courseId)->count();

        // Randomize the video file (1.mp4, 2.mp4, or 3.mp4)
        $videoFile = fake()->numberBetween(1, 3) . '.mp4';

        return [
            'chapter_name' => fake()->sentence(),
            'chapter_description' => fake()->paragraph(),
            'course_id' => $courseId,
            'order' => $currentOrder + 1, // Increment order for this course_id
            'chapter_video' => 'chapter_videos/' . $videoFile,
        ];
    }
}
