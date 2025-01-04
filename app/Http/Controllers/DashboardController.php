<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\BarangKeluar;
use App\Models\BarangMasuk;
use App\Models\Kategori;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $currentYear = date('Y');

        // chart 1
        $barangMasuk = BarangMasuk::selectRaw('MONTH(tanggal_masuk) as month, SUM(jumlah) as total_in')
            ->whereYear('tanggal_masuk', $currentYear)
            ->groupByRaw('MONTH(tanggal_masuk)')
            ->orderByRaw('MONTH(tanggal_masuk)')
            ->get()
            ->keyBy('month');

        $barangKeluar = BarangKeluar::selectRaw('MONTH(tanggal_keluar) as month, SUM(jumlah) as total_out')
            ->whereYear('tanggal_keluar', $currentYear)
            ->groupByRaw('MONTH(tanggal_keluar)')
            ->orderByRaw('MONTH(tanggal_keluar)')
            ->get()
            ->keyBy('month');

        $chartData1 = collect(range(1, 12))->map(function ($month) use ($barangMasuk, $barangKeluar) {
            return [
                'month' => $month,
                'total_in' => $barangMasuk[$month]->total_in ?? 0,
                'total_out' => $barangKeluar[$month]->total_out ?? 0,
            ];
        });

        // chart 2
        $totalKategori = Kategori::whereYear('created_at', $currentYear)->count();
        $totalSupplier = Supplier::whereYear('created_at', $currentYear)->count();
        $totalBarang = Barang::whereYear('created_at', $currentYear)->count();
        $totalBarangMasuk = (int) BarangMasuk::whereYear('tanggal_masuk', $currentYear)->sum('jumlah');
        $totalBarangKeluar = (int) BarangKeluar::whereYear('tanggal_keluar', $currentYear)->sum('jumlah');

        $chartData2 = [
            ['name' => 'kategori', 'total' => $totalKategori, 'fill' => 'var(--color-kategori)'],
            ['name' => 'supplier', 'total' => $totalSupplier, 'fill' => 'var(--color-supplier)'],
            ['name' => 'barang', 'total' => $totalBarang, 'fill' => 'var(--color-barang)'],
            ['name' => 'barang_masuk', 'total' => $totalBarangMasuk, 'fill' => 'var(--color-barang_masuk)'],
            ['name' => 'barang_keluar', 'total' => $totalBarangKeluar, 'fill' => 'var(--color-barang_keluar)'],
        ];

        // chart 3
        $admin = User::role('admin')->count();
        $petugas = User::role('petugas')->count();
        $chartData3 = [
            ['admin' => $admin, 'petugas' => $petugas,],
        ];

        return Inertia::render('dashboard', compact('chartData1', 'chartData2', 'chartData3'));
    }
}
