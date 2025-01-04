<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response) {
            if (shouldRenderCustomErrorPage() && in_array($response->getStatusCode(), [403, 404, 500])) {
                $statusCode = $response->getStatusCode();

                $title = __('http-statuses.' . $statusCode);

                $message = match ($statusCode) {
                    403 => 'You do not have permission to access this resource.',
                    404 => 'The requested resource could not be found on the server.',
                    500 => 'An unexpected error occurred on the server.',
                    default => 'An unknown error occurred.',
                };

                return Inertia::render('errors/index', [
                    'code' => $statusCode,
                    'title' => $title,
                    'message' => $message,
                ]);
            }

            return $response;
        });
    })->create();

function shouldRenderCustomErrorPage()
{
    if (app()->environment(['local', 'testing'])) {
        return false;
    }

    if (config('app.custom_error_page_enabled')) {
        return true;
    }
}
