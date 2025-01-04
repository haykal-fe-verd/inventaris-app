<?php

namespace App\Http\Controllers;

use App\Models\BarangKeluar;
use App\Models\BarangMasuk;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Barryvdh\DomPDF\Facade\Pdf;

class LaporanController extends Controller
{
    public function laporanBarangMasuk(Request $request): Response
    {
        $barangMasuk = [];
        if ($request->has('from') && $request->has('to')) {
            $from = $request->input('from');
            $to = $request->input('to');

            $barangMasuk = BarangMasuk::with(['barang', 'barang.kategori', 'supplier'])
                ->whereBetween('tanggal_masuk', [$from, $to])
                ->get();
        }

        return Inertia::render('laporan/barang-masuk', compact('barangMasuk'));
    }

    public function pdfBarangMasuk(Request $request)
    {
        $request->validate([
            'from' => 'required|date',
            'to' => 'required|date|after_or_equal:from',
        ]);

        $from = $request->input('from');
        $to = $request->input('to');

        $barangMasuk = BarangMasuk::with(['barang', 'barang.kategori', 'supplier'])
            ->whereBetween('tanggal_masuk', [$from, $to])
            ->get();

        $pdf = Pdf::loadView('barang-masuk', compact('barangMasuk', 'from', 'to'));

        return $pdf->stream('Laporan_Barang_Masuk.pdf');
    }

    public function laporanBarangKeluar(Request $request): Response
    {
        $barangKeluar = [];
        if ($request->has('from') && $request->has('to')) {
            $from = $request->input('from');
            $to = $request->input('to');

            $barangKeluar = BarangKeluar::with(['barang', 'barang.kategori', 'supplier'])
                ->whereBetween('tanggal_keluar', [$from, $to])
                ->get();
        }

        return Inertia::render('laporan/barang-keluar', compact('barangKeluar'));
    }

    public function pdfBarangKeluar(Request $request)
    {
        $request->validate([
            'from' => 'required|date',
            'to' => 'required|date|after_or_equal:from',
        ]);

        $from = $request->input('from');
        $to = $request->input('to');

        $barangKeluar = BarangKeluar::with(['barang', 'barang.kategori', 'supplier'])
            ->whereBetween('tanggal_keluar', [$from, $to])
            ->get();

        $pdf = Pdf::loadView('barang-keluar', compact('barangKeluar', 'from', 'to'));

        return $pdf->stream('Laporan_Barang_Keluar.pdf');
    }
}
