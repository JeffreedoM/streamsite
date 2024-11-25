<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use Illuminate\Http\Request;
use App\Models\CourseChapter;

class CourseChapterController extends Controller
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
        $field = $request->validate([
            'chapter_name' => 'required|string',
            'course_id' => 'required'
        ]);

        // Get the current maximum order value for the given course
        $maxOrder = CourseChapter::where('course_id', $field['course_id'])->max('order');

        // Increment the order for the new chapter
        $field['order'] = $maxOrder ? $maxOrder + 1 : 1;

        // Create the new chapter
        $chapter = CourseChapter::create($field);

        return redirect()->route('course.edit', $chapter->course_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $chapter = CourseChapter::find($id);
        $course = Course::find($chapter->course_id);
        return Inertia::render('Courses/Teacher/Chapter', [
            'id' => $id,
            'course_chapter' => $chapter,
            'course' => $course
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
     * Update the ordering of chapters.
     */
    public function updateChapterOrders(Request $request, string $id)
    {
        $chapters = $request->input('chapters');

        foreach ($chapters as $chapter) {
            CourseChapter::where('id', $chapter['id'])->update(['order' => $chapter['order']]);
        }

        return redirect()->route('course.edit', $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
