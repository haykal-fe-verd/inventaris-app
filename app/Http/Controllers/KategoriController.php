<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use App\Actions\Kategori\CreateKategori;
use App\Actions\Kategori\DeleteKategori;
use App\Actions\Kategori\EditKategori;
use App\Actions\Kategori\GetKategori;
use App\Http\Requests\Kategori\StoreKategoriRequest;
use App\Http\Requests\Kategori\UpdateKategoriRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, GetKategori $getKategori): Response
    {
        $data = $getKategori->handle($request);
        return Inertia::render('kategori/index', compact('data'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKategoriRequest $request, CreateKategori $createKategori): RedirectResponse
    {
        $createKategori->handle($request->validated());

        $admin = User::role('admin')->first();
        event(new \App\Events\ActionNotificationEvent($admin, "{$request->user()->name} baru saja menambahkan kategori."));

        return redirect()->route('kategori.index')->with('success', __('Kategori berhasil ditambahkan.'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKategoriRequest $request, Kategori $kategori, EditKategori $editKategori): RedirectResponse
    {
        $editKategori->handle($kategori, $request->validated());

        $admin = User::role('admin')->first();
        event(new \App\Events\ActionNotificationEvent($admin, "{$request->user()->name} baru saja mengupdate kategori."));

        return redirect()->route('kategori.index')->with('success', __('Kategori berhasil diperbarui.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kategori $kategori, DeleteKategori $deleteKategori, Request $request): RedirectResponse
    {
        $deleteKategori->handle($kategori);

        $admin = User::role('admin')->first();
        event(new \App\Events\ActionNotificationEvent($admin, "{$request->user()->name} baru saja menghapus kategori."));

        return redirect()->route('kategori.index')->with('success', __('Kategori berhasil dihapus.'));
    }
}
