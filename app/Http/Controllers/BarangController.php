<?php

namespace App\Http\Controllers;

use App\Actions\Barang\CreateBarang;
use App\Actions\Barang\DeleteBarang;
use App\Actions\Barang\EditBarang;
use App\Actions\Barang\GetBarang;
use App\Http\Requests\Barang\StoreBarangRequest;
use App\Http\Requests\Barang\UpdateBarangRequest;
use App\Models\Barang;
use App\Models\Kategori;
use App\Models\Supplier;
use App\Models\User;
use App\Traits\ImageUpload;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class BarangController extends Controller
{
    use ImageUpload;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, GetBarang $getBarang): Response
    {
        $kategori = Kategori::all();
        $supplier = Supplier::all();
        $data = $getBarang->handle($request);

        return Inertia::render('barang/index', compact('data', 'kategori', 'supplier'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $kategori = Kategori::all();
        $supplier = Supplier::all();

        return Inertia::render('barang/create', compact('kategori', 'supplier'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBarangRequest $request, CreateBarang $createBarang): RedirectResponse
    {
        $gambar = $this->upload($request, 'gambar', 'barang');
        $createBarang->handle($request->validated() + ['gambar' => $gambar]);

        $admin = User::role('admin')->first();
        event(new \App\Events\ActionNotificationEvent($admin, "{$request->user()->name} baru saja menambahkan barang."));

        return back()->with('success', __('Barang berhasil ditambahkan.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Barang $barang): Response
    {
        $barang->load('kategori', 'supplier');
        return Inertia::render('barang/detail', compact('barang'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Barang $barang): Response
    {
        $kategori = Kategori::all();
        $supplier = Supplier::all();

        return Inertia::render('barang/edit', compact('barang', 'kategori', 'supplier'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBarangRequest $request, Barang $barang, EditBarang $editBarang): RedirectResponse
    {
        $gambar = $this->upload($request, 'gambar', 'barang', $barang->gambar);
        $editBarang->handle($barang, $request->validated() + ['gambar' => $gambar]);

        $admin = User::role('admin')->first();
        event(new \App\Events\ActionNotificationEvent($admin, "{$request->user()->name} baru saja mengupdate barang."));

        return back()->with('success', __('Barang berhasil diperbarui.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Barang $barang, DeleteBarang $deleteBarang, Request $request): RedirectResponse
    {
        $this->delete($barang->gambar);
        $deleteBarang->handle($barang);

        $admin = User::role('admin')->first();
        event(new \App\Events\ActionNotificationEvent($admin, "{$request->user()->name} baru saja menghapus barang."));

        return back()->with('success', __('Barang berhasil dihapus.'));
    }
}
