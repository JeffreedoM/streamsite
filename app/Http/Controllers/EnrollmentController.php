<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{

    public function enroll(Request $request, $courseId)
    {
        $user = Auth::user();
        $course = Course::findOrFail($courseId);

        // Check if the password matches
        if ($request->password !== $course->password) {
            return back()->withErrors(['password' => 'Invalid course password']);
        }

        // Check if already enrolled
        if ($user->courses->contains($courseId)) {
            return back()->with('message', 'You are already enrolled in this course.');
        }

        // Enroll the user
        $user->courses()->attach($courseId, ['enrolled_at' => now()]);

        return redirect()->route('courses.show', $courseId)->with('message', 'Successfully enrolled!');
    }
}
