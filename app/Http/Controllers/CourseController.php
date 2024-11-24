<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use App\Models\CourseChapter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Courses/Teacher/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Courses/Teacher/CreateCourse');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $field = $request->validate([
            'course_title' => 'required|string'
        ]);

        $course = Course::create($field);
        // dd($course->id);

        return redirect()->route('course.edit', $course->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $course = Course::find($id);
        $course_chapters = CourseChapter::where('course_id', $id)
            ->orderBy('order', 'asc')
            ->get();

        // Count the number of fields with a value
        $completedFields = collect([
            'course_title' => $course->course_title,
            'course_description' => $course->course_description,
            'course_image' => $course->course_image,
        ])->filter(function ($value) {
            return !empty($value); // Check if the field has a value
        })->count();



        return Inertia::render('Courses/Teacher/EditCourse', [
            'course' => $course,
            'completedFields' => $completedFields,
            'course_image_url' => Storage::url($course->course_image),
            'course_chapters' => $course_chapters
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $fields = $request->validate([
            'course_title' => 'sometimes|required|string',
            'course_description' => 'sometimes|string',
        ]);

        $course = Course::find($id);
        $course->update($fields);
        return redirect()->route('course.edit', $course->id);
    }

    /**
     * Update the course_image
     */
    public function updateImage(Request $request, string $id)
    {
        // Validate the incoming file
        $request->validate([
            'course_image' => 'image|max:5120',
        ], ['course_image.max' => "The image must be less than or equal to 5mb."]);

        $course = Course::find($id);

        if ($course) {
            // Check if there's an existing image and delete it from storage
            if ($course->course_image) {
                // Check if the image exists in storage

                $filePath = public_path() . $course->course_image;
                if ($filePath) {
                    // If it exists, delete it
                    Storage::disk('public')->delete($course->course_image);
                }
            }
            // Check if a new image has been uploaded
            if ($request->hasFile('course_image')) {

                // Store the new image and get the path
                $path = $request->file('course_image')->store('course_images', 'public');

                // Update the course with the new image path
                $course->update(['course_image' => $path]);
            }
        }

        // Redirect back to the course edit page after update
        return redirect()->route('course.edit', $course->id)->with(['status' => 'success', 'message' => 'Image updated']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
