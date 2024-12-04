<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'course_title' => fake()->sentence(),
            'course_description' => fake()->paragraph(),
            'course_image' => "",
            'status' => fake()->randomElement(['published', 'draft']),
            'password' => fake()->password(),
        ];
    }
}