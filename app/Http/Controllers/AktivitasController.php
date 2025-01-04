<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Activitylog\Models\Activity;

class AktivitasController extends Controller
{
    public function index(Request $request): Response
    {
        $data = Activity::with('causer')
            ->latest()
            ->paginate(10);

        return Inertia::render('aktivitas/index', compact('data'));
    }
}
