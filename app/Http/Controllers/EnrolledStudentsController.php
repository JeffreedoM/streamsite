<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use Inertia\Controller;
use Illuminate\Http\Request;

class EnrolledStudentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $courseId)
    {
        $course = Course::with('students')->findOrFail($courseId);

        // dd($course->students);
        return Inertia::render('Courses/Teacher/EnrolledStudents', [
            'course' => $course,
            'enrolledStudents' => $course->students
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
