<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckEnrollmentStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();


        $courseId = $request->route('course_id');

        $course = $user->courses()->where('course_id', $courseId)->first();

        if (!$course) {
            return redirect()->route('student-course.index')->with('message', 'You are not enrolled in this course.');
        }

        if ($course->pivot->status == 2) {
            return redirect()->route('student-course.index')->with('message', 'Your enrollment has expired.');
        }
        if ($course->pivot->status == 3) {
            return redirect()->route('student-course.index')->with('message', 'Your enrollment is not active.');
        }

        return $next($request);
    }
}
