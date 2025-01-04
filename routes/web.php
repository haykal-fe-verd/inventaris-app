<?php

use App\Http\Controllers\AktivitasController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\BarangKeluarController;
use App\Http\Controllers\BarangMasukController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('barang-keluar/qr/{barang_keluar}', [BarangKeluarController::class, 'qr'])->name('barang-keluar.qr');

// guest
Route::middleware('guest')->group(
    function () {
        Route::get('/', [AuthController::class, 'login'])->name('login');
        Route::post('/', [AuthController::class, 'login_store']);

        Route::get('forgot-password', [AuthController::class, 'reset_password_index'])->name('password.request');
        Route::post('forgot-password', [AuthController::class, 'reset_password_email'])->name('password.email');

        Route::get('reset-password/{token}', [AuthController::class, 'new_password_index'])->name('password.reset');
        Route::post('reset-password', [AuthController::class, 'new_password_store'])->name('password.store');
    }
);

// auth
Route::middleware('auth')->group(
    function () {
        // auth
        Route::post('logout', [AuthController::class, 'logout'])->name('logout');
        Route::put('password', [AuthController::class, 'update_password'])->name('password.update');
        Route::get('confirm-password', [AuthController::class, 'confirm_password_index'])->name('password.confirm');
        Route::post('confirm-password', [AuthController::class, 'confirm_password_store']);
        Route::get('update-password', [AuthController::class, 'update_password_index'])->name('password.update');
        Route::post('update-password', [AuthController::class, 'update_password']);
        Route::get('profile', [AuthController::class, 'profile_index'])->name('profile.edit');
        Route::post('profile', [AuthController::class, 'profile_update'])->name('profile.update');

        // app
        Route::get('dashboard', DashboardController::class)->name('dashboard');

        // manajemen user
        Route::get('user', [UserController::class, 'index'])
            ->middleware('permission:view_user')
            ->name('user.index');
        Route::get('user/create', [UserController::class, 'create'])
            ->middleware('permission:insert_user')
            ->name('user.create');
        Route::post('user', [UserController::class, 'store'])
            ->middleware('permission:insert_user')
            ->name('user.store');
        Route::get('user/{id}', [UserController::class, 'show'])
            ->middleware('permission:view_user')
            ->name('user.show');
        Route::get('user/{id}/edit', [UserController::class, 'edit'])
            ->middleware('permission:update_user')
            ->name('user.edit');
        Route::post('user/{id}/edit', [UserController::class, 'update'])
            ->middleware('permission:update_user')
            ->name('user.update');
        Route::delete('user/{id}', [UserController::class, 'destroy'])
            ->middleware('permission:delete_user')
            ->name('user.destroy');

        // kategori
        Route::get('kategori', [KategoriController::class, 'index'])
            ->middleware('permission:view_kategori')
            ->name('kategori.index');
        Route::post('kategori', [KategoriController::class, 'store'])
            ->middleware('permission:insert_kategori')
            ->name('kategori.store');
        Route::put('kategori/{kategori}', [KategoriController::class, 'update'])
            ->middleware('permission:update_kategori')
            ->name('kategori.update');
        Route::delete('kategori/{kategori}', [KategoriController::class, 'destroy'])
            ->middleware('permission:delete_kategori')
            ->name('kategori.destroy');

        // supplier
        Route::get('supplier', [SupplierController::class, 'index'])
            ->middleware('permission:view_supplier')
            ->name('supplier.index');
        Route::post('supplier', [SupplierController::class, 'store'])
            ->middleware('permission:insert_supplier')
            ->name('supplier.store');
        Route::put('supplier/{supplier}', [SupplierController::class, 'update'])
            ->middleware('permission:update_supplier')
            ->name('supplier.update');
        Route::delete('supplier/{supplier}', [SupplierController::class, 'destroy'])
            ->middleware('permission:delete_supplier')
            ->name('supplier.destroy');

        // barang
        Route::get('barang', [BarangController::class, 'index'])
            ->middleware('permission:view_barang')
            ->name('barang.index');
        Route::get('barang/create', [BarangController::class, 'create'])
            ->middleware('permission:insert_barang')
            ->name('barang.create');
        Route::post('barang', [BarangController::class, 'store'])
            ->middleware('permission:insert_barang')
            ->name('barang.store');
        Route::get('barang/{barang}', [BarangController::class, 'show'])
            ->middleware('permission:view_barang')
            ->name('barang.show');
        Route::get('barang/{barang}/edit', [BarangController::class, 'edit'])
            ->middleware('permission:update_barang')
            ->name('barang.edit');
        Route::post('barang/{barang}', [BarangController::class, 'update'])
            ->middleware('permission:update_barang')
            ->name('barang.update');
        Route::delete('barang/{barang}', [BarangController::class, 'destroy'])
            ->middleware('permission:delete_barang')
            ->name('barang.destroy');

        // barang masuk
        Route::get('barang-masuk', [BarangMasukController::class, 'index'])
            ->middleware('permission:view_barang_masuk')
            ->name('barang-masuk.index');
        Route::get('barang-masuk/create', [BarangMasukController::class, 'create'])
            ->middleware('permission:insert_barang_masuk')
            ->name('barang-masuk.create');
        Route::post('barang-masuk', [BarangMasukController::class, 'store'])
            ->middleware('permission:insert_barang_masuk')
            ->name('barang-masuk.store');
        Route::get('barang-masuk/{barang_masuk}', [BarangMasukController::class, 'show'])
            ->middleware('permission:view_barang_masuk')
            ->name('barang-masuk.show');
        Route::delete('barang-masuk/{barang_masuk}', [BarangMasukController::class, 'destroy'])
            ->middleware('permission:delete_barang_masuk')
            ->name('barang-masuk.destroy');

        // barang keluar
        Route::get('barang-keluar', [BarangKeluarController::class, 'index'])
            ->middleware('permission:view_barang_keluar')
            ->name('barang-keluar.index');
        Route::get('barang-keluar/create', [BarangKeluarController::class, 'create'])
            ->middleware('permission:insert_barang_keluar')
            ->name('barang-keluar.create');
        Route::post('barang-keluar', [BarangKeluarController::class, 'store'])
            ->middleware('permission:insert_barang_keluar')
            ->name('barang-keluar.store');
        Route::get('barang-keluar/{barang_keluar}', [BarangKeluarController::class, 'show'])
            ->middleware('permission:view_barang_keluar')
            ->name('barang-keluar.show');
        Route::delete('barang-keluar/{barang_keluar}', [BarangKeluarController::class, 'destroy'])
            ->middleware('permission:delete_barang_keluar')
            ->name('barang-keluar.destroy');

        // laporan
        Route::get('laporan-barang-masuk', [LaporanController::class, 'laporanBarangMasuk'])
            ->middleware('permission:view_laporan_pemasukan')
            ->name('laporan-barang-masuk.index');
        Route::get('laporan-barang-masuk/pdf', [LaporanController::class, 'pdfBarangMasuk'])
            ->middleware('permission:view_laporan_pemasukan')
            ->name('laporan.barang-masuk.pdf');

        Route::get('laporan-barang-keluar', [LaporanController::class, 'laporanBarangKeluar'])
            ->middleware('permission:view_laporan_pengeluaran')
            ->name('laporan-barang-keluar.index');
        Route::get('laporan-barang-keluar/pdf', [LaporanController::class, 'pdfBarangKeluar'])
            ->middleware('permission:view_laporan_pengeluaran')
            ->name('laporan.barang-keluar.pdf');

        // aktivitas
        Route::get('aktivitas', [AktivitasController::class, 'index'])
            ->middleware('permission:view_aktivitas')
            ->name('aktivitas.index');
    }
);
