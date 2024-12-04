<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $roles = json_decode($user->roles);  // Decode the roles from JSON


        // Get the active role from session, or default to 'student' if no active role is set
        $activeRole = session('active_role', 'student'); // Default to 'student' if no active role is set
        return Inertia::render('Dashboard', [
            'activeRole' => $activeRole,
        ]);
    }
}
