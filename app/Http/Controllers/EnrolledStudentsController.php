<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
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
            'enrolledStudents' => $course->students->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'email' => $student->email,
                    'enrolled_at' => $student->pivot->enrolled_at,
                    'expiration_date' => $student->pivot->expiration_date,
                    'status' => $student->pivot->status,
                ];
            })
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
    public function updateExpirationDate(Request $request)
    {
        $courseId = $request->input('courseId');
        $userId = $request->input('userId');
        $field = $request->validate([
            'expiration_date' => 'required|date'
        ]);

        $newExpirationDate = $field['expiration_date'];

        $expiration = Carbon::parse($newExpirationDate);
        $today = Carbon::today();

        $newStatus = $expiration->greaterThan($today) ? 1 : 2; // 1 = active, 2 = expired


        $user = User::findOrFail($userId);
        $course = Course::findOrFail($courseId);


        $user->courses()->updateExistingPivot($courseId, [
            'expiration_date' => $newExpirationDate,
            'status' => $newStatus,

        ]);

        return redirect()->route('enrolled-students.show', $courseId);
    }

    public function toggleEnrolledStudentStatus(Request $request)
    {
        $courseId = $request->input('courseId');
        $userId = $request->input('userId');
        $status = $request->input('status');
        $expirationDate = $request->input('expiration_date'); // Make sure this is sent if needed

        $today = Carbon::today();

        $user = User::findOrFail($userId);

        // Set new status
        if ($status <= 2) {
            // If currently active or expired, set to disabled (3)
            $newStatus = 3;
        } else {
            // If currently disabled, use expiration to set to 1 or 2
            $expiration = Carbon::parse($expirationDate);
            $newStatus = $expiration->greaterThanOrEqualTo($today) ? 1 : 2;
        }

        // Update pivot
        $user->courses()->updateExistingPivot($courseId, [
            'status' => $newStatus,
        ]);

        return redirect()->route('enrolled-students.show', $courseId);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
