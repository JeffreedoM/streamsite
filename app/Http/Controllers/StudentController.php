<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use App\Models\CourseChapter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        // Decode the roles column to get an array of roles
        $roles = json_decode($user->roles);

        // Fetch published courses and append the full course_image URL
        $courses = Course::where('status', 'published')->get()->map(function ($course) {
            $course->course_image = $course->course_image
                ? Storage::url($course->course_image)
                : null; // Handle cases where course_image is null
            return $course;
        });
        return Inertia::render('Courses/Student/Index', [
            'courses' => $courses

        ]);
    }


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
    public function show(string $course_id, string $chapter_id = null)
    {
        $course = Course::where('id', $course_id)->first();
        if ($chapter_id) {
            // if there is chapter_id in params, course/{course_id}/{chapter_id}
            // get all chapters using course id

            $chapters = CourseChapter::where('course_id', $course_id)->orderBy('order', 'asc')->get();

            // get the chapter using the chapter_id in the params
            $chapter = CourseChapter::where('id', $chapter_id)->first();

            // set the video id using chapter_id
            $video_url = route('chapter.video', ['id' => $chapter_id]) . '?v=' . time();
        } else {
            // If there is no chapter_id params, courses/{course_id}
            // get the chapter which has order = 1
            // get the id of that first chapter and set that to the video

            $chapters = CourseChapter::where('course_id', $course_id)->orderBy('order', 'asc')->get();
            $chapter = $chapters->first();
            $video_url = route('chapter.video', ['id' => $chapter->id]) . '?v=' . time();
        }

        // dd($chapter);
        // dd($course);
        // $course->course_image = Storage::url($course->course_image);

        return Inertia::render('Courses/Student/CourseDetails', [
            'course' => $course,
            'chapter' => $chapter,
            'chapters' => $chapters,
            'video_url' => $video_url
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
