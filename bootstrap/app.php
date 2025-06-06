<?php

use App\Http\Middleware\CheckEnrollmentStatus;
use App\Http\Middleware\CheckRole;
use Illuminate\Foundation\Application;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\UpgradeToHttpsUnderNgrok;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            UpgradeToHttpsUnderNgrok::class,

        ]);
        $middleware->alias([
            'role' => CheckRole::class,
            'check.enrollment.status' => CheckEnrollmentStatus::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
