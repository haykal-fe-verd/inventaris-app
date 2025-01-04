<?php

namespace App\Http\Controllers;

use App\Actions\BarangKeluar\CreateBarangKeluar;
use App\Actions\BarangKeluar\DeleteBarangKeluar;
use App\Actions\BarangKeluar\GetBarangKeluar;
use App\Http\Requests\BarangKeluar\StoreBarangKeluarRequest;
use App\Models\Barang;
use App\Models\BarangKeluar;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BarangKeluarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, GetBarangKeluar $getBarangKeluar): Response
    {
        $supplier = Supplier::all();
        $data = $getBarangKeluar->handle($request);

        return Inertia::render('barang-keluar/index', compact('data', 'supplier'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $supplier = Supplier::all();
        $barang = null;
        if ($request->has('id_supplier')) {
            $barang = Barang::where('id_supplier', $request->id_supplier)->get();
        }

        return Inertia::render('barang-keluar/create', compact('supplier', 'barang'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBarangKeluarRequest $request, CreateBarangKeluar $createBarangKeluar): RedirectResponse
    {
        $createBarangKeluar->handle($request->validated());

        $admin = User::role('admin')->first();
        event(new \App\Events\ActionNotificationEvent($admin, "{$request->user()->name} baru saja menambahkan barang keluar."));

        return back()->with('success', __('Barang Keluar berhasil ditambahkan.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(BarangKeluar $barangKeluar)
    {
        $barangKeluar->load('barang', 'barang.kategori', 'supplier');
        return Inertia::render('barang-keluar/detail', compact('barangKeluar'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BarangKeluar $barangKeluar, DeleteBarangKeluar $deleteBarangKeluar, Request $request): RedirectResponse
    {
        $deleteBarangKeluar->handle($barangKeluar);

        $admin = User::role('admin')->first();
        event(new \App\Events\ActionNotificationEvent($admin, "{$request->user()->name} baru saja meghapus barang keluar."));

        return back()->with('success', __('Barang keluar berhasil dihapus.'));
    }

    public function qr(BarangKeluar $barangKeluar)
    {
        $barangKeluar->load('barang', 'barang.kategori', 'supplier');
        return Inertia::render('barang-keluar/qr', compact('barangKeluar'));
    }
}
