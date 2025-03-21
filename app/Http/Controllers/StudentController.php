<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use Illuminate\Http\Request;
use App\Models\CourseChapter;
use App\Models\UserCourseProgress;
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

        // Fetch unenrolled courses with chapter count
        $unenrolledCourses = Course::where('status', 'published')
            ->whereNotIn('id', $user->courses->pluck('id'))
            ->withCount('chapters')
            ->get()
            ->map(function ($course) {
                $course->course_image = $course->course_image ? Storage::url($course->course_image) : null;
                return $course;
            });

        // Fetch enrolled courses with chapter count & progress
        $enrolledCourses = Course::whereIn('id', $user->courses->pluck('id'))
            ->withCount('chapters')
            ->withCount([
                'chapters as completed_chapters_count' => function ($query) use ($user) {
                    $query->whereHas('progress', function ($progressQuery) use ($user) {
                        $progressQuery->where('user_id', $user->id)
                            ->where('is_completed', 1);
                    });
                }
            ])
            ->get()
            ->map(function ($course) {
                $course->course_image = $course->course_image ? Storage::url($course->course_image) : null;

                // Calculate progress
                $completedChapters = $course->completed_chapters_count ?? 0;
                $totalChapters = $course->chapters_count ?? 0;
                $course->progress = $totalChapters > 0 ? round(($completedChapters / $totalChapters) * 100) : 0;

                return $course;
            });

        return Inertia::render('Courses/Student/Index', [
            'unenrolledCourses' => $unenrolledCourses,
            'enrolledCourses' => $enrolledCourses,
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
        $user = Auth::user();

        // Get the course in a single query
        $course = Course::findOrFail($course_id);

        // Get all chapters for the course, ordered by 'order'
        $chapters = CourseChapter::where('course_id', $course_id)->orderBy('order', 'asc')->get();

        // Determine which chapter to display
        $chapter = $chapter_id ? CourseChapter::find($chapter_id) : $chapters->first();

        // Get the video URL for the chapter
        $video_url = route('chapter.video', ['id' => $chapter->id]) . '?v=' . time();

        // Check if the chapter is completed for the user
        $isCompleted = UserCourseProgress::where('user_id', $user->id)
            ->where('chapter_id', $chapter->id)
            ->value('is_completed'); // Retrieves only the is_completed value

        // Get all progress for the user for this course (eager load chapter data)
        $progress = UserCourseProgress::with('chapter')
            ->where('user_id', $user->id)
            ->whereHas('chapter', function ($query) use ($course_id) {
                $query->where('course_id', $course_id);
            })
            ->get();

        // Get all chapters for the course
        $totalChapters = CourseChapter::where('course_id', $course_id)->count();

        // Get completed chapters for the user in the course
        $completedChapters = UserCourseProgress::with('chapter')
            ->where('user_id', $user->id)
            ->whereHas('chapter', function ($query) use ($course_id) {
                $query->where('course_id', $course_id);
            })
            ->where('is_completed', true)
            ->count();

        // Calculate percentage
        $completionPercentage = $totalChapters > 0
            ? round(($completedChapters / $totalChapters) * 100, 2)
            : 0;
        // dd($progress);

        // Render the page with the required data
        return Inertia::render('Courses/Student/CourseDetails', [
            'course' => $course,
            'chapter' => $chapter,
            'chapters' => $chapters,
            'video_url' => $video_url,
            'progress' => $progress,
            'is_completed' => $isCompleted,
            'completionPercentage' => $completionPercentage
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

    public function markComplete(Request $request, $chapter_id)
    {
        $user = Auth::user();

        // Get the current chapter details
        $currentChapter = CourseChapter::findOrFail($chapter_id);

        // Check if there is a previous chapter
        $previousChapter = CourseChapter::where('course_id', $currentChapter->course_id)
            ->where('order', $currentChapter->order - 1)
            ->first();

        if ($previousChapter) {
            // Check if the previous chapter is completed
            $isPreviousCompleted = UserCourseProgress::where('user_id', $user->id)
                ->where('chapter_id', $previousChapter->id)
                ->value('is_completed');

            if (!$isPreviousCompleted) {
                return back()->withErrors(['error' => 'Complete the previous chapter first!']);
            }
        }

        // Mark or unmark the current chapter as completed
        $progress = UserCourseProgress::updateOrCreate(
            [
                'user_id' => $user->id,
                'chapter_id' => $chapter_id,
            ],
            [] // Leave other fields unchanged
        );

        // Handle forceComplete flag
        if ($request->forceComplete) {
            $progress->is_completed = true; // Ensure it's marked as completed
        } else {
            $progress->is_completed = !$progress->is_completed; // Toggle completion
        }
        $progress->save();

        return back();
    }
}
