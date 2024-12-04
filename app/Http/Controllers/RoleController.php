<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function switchRole(Request $request)
    {
        // Validate the selected role
        $request->validate([
            'role' => 'required|in:teacher,student',
        ]);

        // Store the selected role in the session
        session(['active_role' => $request->role]);

        // Redirect back to the course page with the selected role
        return redirect()->route('dashboard');
    }
}
