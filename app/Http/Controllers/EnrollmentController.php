<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class EnrollmentController extends Controller
{

    public function enroll(Request $request, $courseId)
    {

        $user = Auth::user();
        $course = Course::findOrFail($courseId);

        // Check if not yet enrolled
        if (!$user->courses->contains($courseId)) {
            // Not yet enrolled

            // Check if the password matches
            if ($request->password !== $course->password) {
                return back()->withErrors(['password' => 'Invalid course password']);
            } else {
                // Password matches
                // Enroll the user
                $user->courses()->attach($courseId, ['enrolled_at' => now()]);
            }
        }

        return redirect()->route('student-course.show', $courseId)->with('message', 'Successfully enrolled!');
    }

    public function viewEnrollment($course_id)
    {
        $course = Course::find($course_id);
        // dd($course);
        return Inertia::render('Courses/Student/CourseEnroll', [
            'course' => $course,
            'course_image_url' => Storage::url($course->course_image)
        ]);
    }
}
