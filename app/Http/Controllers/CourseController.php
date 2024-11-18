<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        return Inertia::render('Courses/Teacher/EditCourse', ['course' => $course]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $fields = $request->validate([
            'course_title' => 'sometimes|required|string',
            'course_description' => 'sometimes|string',
            'course_image' => 'sometimes|string',
        ]);

        $course = Course::find($id);
        $course->update($fields);
        return redirect()->route('course.edit', $course->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
