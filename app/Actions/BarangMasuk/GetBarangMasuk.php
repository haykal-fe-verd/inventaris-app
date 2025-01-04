<?php

namespace App\Actions\BarangMasuk;

use App\Models\BarangMasuk;
use Illuminate\Http\Request;

class GetBarangMasuk
{
    const DEFAULT_SORT_COLUMN = 'created_at';
    const DEFAULT_PER_PAGE = 10;

    /**
     * Handle the request to get barang masuk.
     *
     * @param \Illuminate\Http\Request $request
     * @return object
     */
    public function handle(Request $request): object
    {
        $query = BarangMasuk::with(['barang', 'supplier']);

        // filter
        if ($request->has('filter')) {
            $filter = $request->filter;
            $query->whereHas('supplier', function ($q) use ($filter) {
                $q->where('nama', 'like', '%' . $filter . '%');
            });
        }

        // search
        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('kode_barang_masuk', 'like', '%' . $request->search . '%')
                    ->orWhere('jumlah', 'like', '%' . $request->search . '%')
                    ->orWhere('tanggal_masuk', 'like', '%' . $request->search . '%');

                $q->orWhereHas('barang', function ($q2) use ($request) {
                    $q2->where('nama', 'like', '%' . $request->search . '%');
                });
            });
        }

        // sort
        if ($request->has('sort')) {
            if ($request->sort == 'created_at') {
                $query->orderBy($request->sort, 'desc');
            } elseif ($request->sort == 'jumlah') {
                $query->orderBy($request->sort, 'desc');
            } else {
                $query->orderBy($request->sort, 'asc');
            }
        } else {
            $query->orderBy(self::DEFAULT_SORT_COLUMN, 'desc');
        }

        // perpage
        $perPage = $request->input('perpage', self::DEFAULT_PER_PAGE);

        // data
        $data = $query->paginate($perPage)->appends($request->all());

        return $data;
    }
}
