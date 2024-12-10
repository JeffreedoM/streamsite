<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CourseChapterController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\EnrollmentController;

Route::get('/', function () {
    return inertia('Home');
})->name('home');


/* 
        Authentication
*/

// Views
Route::get('/login', function () {
    return inertia('Login');
})->name('login');
Route::get('/register', function () {
    return inertia('Register');
})->name('register');

// Controllers
Route::controller(LoginController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/logout', 'logout')->name('logout');
    Route::post('/register', 'register');
});

// Socialite
Route::controller(SocialiteController::class)->group(function () {
    Route::get('/auth/google', 'googleLogin')->name('auth.google');
    Route::get('/auth/google-callback', 'googleAuthentication')->name('auth.google-callback');
});


/* 
        Dashboard    
*/

Route::middleware(['auth:sanctum', 'role:teacher'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Courses
    Route::get('/teacher/courses', [CourseController::class, 'index'])->name('course.index');
    Route::get('/course/create', [CourseController::class, 'create'])->name('course.create');
    Route::post('/course/create', [CourseController::class, 'store'])->name('course.store');
    Route::get('/course/create/{id}', [CourseController::class, 'edit'])->name('course.edit');
    Route::put('/course/update/{id}', [CourseController::class, 'update'])->name('course.update');
    Route::put('/course/updateImage/{id}', [CourseController::class, 'updateImage'])->name('course.updateImage');

    // Chapter
    Route::post('/chapter/create', [CourseChapterController::class, 'store'])->name('chapter.store');
    Route::get('/chapter/{id}', [CourseChapterController::class, 'show'])->name('chapter.show');
    Route::put('/chapter/{id}', [CourseChapterController::class, 'update'])->name('chapter.update');
    Route::post('/chapter/{id}/updateOrder', [CourseChapterController::class, 'updateChapterOrders'])->name('chapter.updateOrder');
    Route::post('/chapter/{id}/video/upload', [CourseChapterController::class, 'process'])->name('chapterVideo.upload');
    Route::put('/chapter/{id}/video/submit', [CourseChapterController::class, 'submitVideo'])->name('chapterVideo.submit');

    Route::delete('/chapter/{id}/video/upload', [CourseChapterController::class, 'revert'])->name('chapterVideo.revert');

    Route::get('/chapter/video/{id}', [CourseChapterController::class, 'getChapterVideo'])->name('chapter.video');


    Route::post('/switch-role', [RoleController::class, 'switchRole'])->name('switchRole');
});


Route::middleware(['auth:sanctum', 'role:student'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // Route::get('/courses', [CourseController::class, 'index'])->name('course.index');
    // Route::post('/switch-role', [RoleController::class, 'switchRole'])->name('switchRole');

    Route::get('/courses', [StudentController::class, 'index'])->name('student-course.index');


    // Enrollment
    Route::post('/courses/{course_id}', [EnrollmentController::class, 'enroll'])->name('enrollment.enroll');
    Route::get('/courses/enroll/{course_id}', [EnrollmentController::class, 'viewEnrollment'])->name('enrollment.view');

    Route::get('/courses/{course_id}/{chapter_id?}', [StudentController::class, 'show'])->name('student-course.show');
});
