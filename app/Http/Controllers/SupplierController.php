<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use App\Actions\Supplier\CreateSupplier;
use App\Actions\Supplier\DeleteSupplier;
use App\Actions\Supplier\EditSupplier;
use App\Actions\Supplier\GetSupplier;
use App\Http\Requests\Supplier\StoreSupplierRequest;
use App\Http\Requests\Supplier\UpdateSupplierRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, GetSupplier $getSupplier): Response
    {
        $data = $getSupplier->handle($request);
        return Inertia::render('supplier/index', compact('data'));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSupplierRequest $request, CreateSupplier $createSupplier): RedirectResponse
    {
        $createSupplier->handle($request->validated());

        $admin = User::role('admin')->first();
        event(new \App\Events\ActionNotificationEvent($admin, "{$request->user()->name} baru saja menambahkan supplier."));

        return redirect()->route('supplier.index')->with('success', __('Supplier berhasil ditambahkan.'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplierRequest $request, Supplier $supplier, EditSupplier $editSupplier): RedirectResponse
    {
        $editSupplier->handle($supplier, $request->validated());


        $admin = User::role('admin')->first();
        event(new \App\Events\ActionNotificationEvent($admin, "{$request->user()->name} baru saja mengupdate supplier."));

        return redirect()->route('supplier.index')->with('success', __('Supplier berhasil diperbarui.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier, DeleteSupplier $deleteSupplier, Request $request): RedirectResponse
    {
        $deleteSupplier->handle($supplier);


        $admin = User::role('admin')->first();
        event(new \App\Events\ActionNotificationEvent($admin, "{$request->user()->name} baru saja menghapus supplier."));

        return redirect()->route('supplier.index')->with('success', __('Supplier berhasil dihapus.'));
    }
}
