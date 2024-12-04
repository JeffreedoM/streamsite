<?php

namespace App\Http\Middleware;


use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        // Get the user's roles from the database (assuming they are stored as JSON)
        $userRoles = json_decode(Auth::user()->roles, true);

        // Check if the user has one of the roles passed to the middleware
        if (!array_intersect($roles, $userRoles)) {
            // If not, redirect them or abort with an error message
            return redirect('dashboard')->with('error', 'Unauthorized');
        }

        return $next($request);
    }
}
