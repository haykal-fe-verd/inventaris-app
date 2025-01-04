<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\BarangMasuk;
use App\Models\Supplier;
use Illuminate\Http\Request;
use App\Actions\BarangMasuk\CreateBarangMasuk;
use App\Actions\BarangMasuk\DeleteBarangMasuk;
use App\Actions\BarangMasuk\GetBarangMasuk;
use App\Http\Requests\BarangMasuk\StoreBarangMasukRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BarangMasukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, GetBarangMasuk $getBarangMasuk): Response
    {
        $supplier = Supplier::all();
        $data = $getBarangMasuk->handle($request);

        return Inertia::render('barang-masuk/index', compact('data', 'supplier'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        $supplier = Supplier::all();
        $barang = null;
        if ($request->has('id_supplier')) {
            $barang = Barang::where('id_supplier', $request->id_supplier)->get();
        }

        return Inertia::render('barang-masuk/create', compact('supplier', 'barang'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBarangMasukRequest $request, CreateBarangMasuk $createBarangMasuk): RedirectResponse
    {
        $createBarangMasuk->handle($request->validated());

        $admin = User::role('admin')->first();
        event(new \App\Events\ActionNotificationEvent($admin, "{$request->user()->name} baru saja menambahkan barang masuk."));

        return back()->with('success', __('Barang Masuk berhasil ditambahkan.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(BarangMasuk $barangMasuk): Response
    {
        $barangMasuk->load('barang', 'barang.kategori', 'supplier');
        return Inertia::render('barang-masuk/detail', compact('barangMasuk'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BarangMasuk $barangMasuk, DeleteBarangMasuk $deleteBarangMasuk, Request $request): RedirectResponse
    {
        $deleteBarangMasuk->handle($barangMasuk);

        $admin = User::role('admin')->first();
        event(new \App\Events\ActionNotificationEvent($admin, "{$request->user()->name} baru saja menghapus barang masuk."));

        return back()->with('success', __('Barang Masuk berhasil dihapus.'));
    }
}
