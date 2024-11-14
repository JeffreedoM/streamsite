<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

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

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Courses
    Route::get('/courses', [CoursesController::class, 'index'])->name('courses.index');
});
