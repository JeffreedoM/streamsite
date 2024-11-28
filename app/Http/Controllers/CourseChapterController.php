<?php

namespace App\Http\Controllers;

use FFMpeg\FFMpeg;
use Inertia\Inertia;
use App\Models\Course;
use Illuminate\Http\Request;
use App\Models\CourseChapter;
use FFMpeg\Format\Video\X264;
use Illuminate\Support\Facades\Storage;

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

        $video_url = route('chapter.video', ['id' => $id]) . '?v=' . time();
        // dd(route('chapter.video', ['id' => $id]));
        return Inertia::render('Courses/Teacher/Chapter', [
            'id' => $id,
            'course_chapter' => $chapter,
            'course' => $course,
            'video_url' => $video_url
        ]);
    }

    public function getChapterVideo($id)
    {
        $chapter = CourseChapter::find($id);
        // Get the video path from storage
        $filePath = storage_path('app/public/' . $chapter->chapter_video);

        // dd($filePath);
        if (file_exists($filePath)) {
            // Return the video file with the Accept-Ranges header
            return response()->file($filePath, [
                'Accept-Ranges' => 'bytes',
                'Content-Type' => 'video/mp4',
            ]);
        }

        // Return a 404 error if the video doesn't exist
        return abort(404, 'Video not found');
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
        $fields = $request->validate([
            'chapter_name' => 'required|string',
            'chapter_description' => 'string',
        ]);

        $chapter = CourseChapter::find($id);
        $chapter->update($fields);

        return redirect()->route('chapter.show', $id);
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

    /**
     * Chapter Video
     */

    // Handle file upload
    public function process(Request $request)
    {
        if ($request->hasFile('files')) {
            $file = $request->file('files');
            $path = $file->store('chapter_videos', 'public'); // Save in "storage/app/public/uploads"

            return response()->json([
                'filePath' => $path,
            ]);
        }

        return response()->json(['error' => 'No file uploaded'], 422);
    }


    // Handle file deletion (revert)
    public function revert(Request $request)
    {
        $filePath = $request->getContent();

        if ($filePath && Storage::disk('public')->exists($filePath)) {

            Storage::disk('public')->delete($filePath);
            return response()->json(['success' => true]);
        }

        return response()->json(['error' => 'File not found'], 404);
    }


    public function submitVideo(Request $request, string $id)
    {
        $filePath = $request->get('filePath');

        if ($filePath) {
            // Fetch the existing record
            $video = CourseChapter::find($id);

            if ($video) {
                // Check if the current video exists in storage and delete it
                if ($video->chapter_video && Storage::disk('public')->exists($video->chapter_video)) {
                    Storage::disk('public')->delete($video->chapter_video);
                }

                // Update the database with the new file path
                $video->chapter_video = $filePath;
                $video->save();
            }
        }

        return redirect()->route('chapter.show', $id)->with(['status' => 'success']);
    }
}
