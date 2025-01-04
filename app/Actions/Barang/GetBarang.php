<?php

namespace App\Actions\Barang;

use App\Models\Barang;
use Illuminate\Http\Request;

class GetBarang
{
    const DEFAULT_SORT_COLUMN = 'created_at';
    const DEFAULT_PER_PAGE = 10;

    /**
     * Handle the request to get barang.
     *
     * @param \Illuminate\Http\Request $request
     * @return object
     */
    public function handle(Request $request): object
    {
        $query = Barang::with(['kategori', 'supplier']);

        // filter
        if ($request->has('filter')) {
            $filter = $request->filter;
            $query->whereHas('kategori', function ($q) use ($filter) {
                $q->where('nama', 'like', '%' . $filter . '%');
            })->orWhereHas('supplier', function ($q) use ($filter) {
                $q->where('nama', 'like', '%' . $filter . '%');
            });
        }

        // search
        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->search . '%')
                    ->orWhere('kode', 'like', '%' . $request->search . '%')
                    ->orWhere('satuan', 'like', '%' . $request->search . '%')
                    ->orWhere('harga', 'like', '%' . $request->search . '%')
                    ->orWhere('stok', 'like', '%' . $request->search . '%');
            });
        }

        // sort
        if ($request->has('sort')) {
            if ($request->sort == 'created_at') {
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
