<?php

namespace App\Http\Controllers;

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
        $newExpirationDate = $request->input('expiration_date');
        $courseId = $request->input('courseId');
        $userId = $request->input('userId');


        $user = User::findOrFail($userId);
        $course = Course::findOrFail($courseId);


        $user->courses()->updateExistingPivot($courseId, [
            'expiration_date' => $newExpirationDate,
        ]);

        // return response()->json([
        //     'message' => 'Expiration date updated successfully.',
        //     'courseId' => $courseId,
        //     'userId' => $userId,
        //     'newExpirationDate' => $newExpirationDate
        // ]);

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
