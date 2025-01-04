<?php

namespace App\Actions\Kategori;

use App\Models\Kategori;
use Illuminate\Http\Request;

class GetKategori
{
    const DEFAULT_SORT_COLUMN = 'created_at';
    const DEFAULT_PER_PAGE = 10;

    /**
     * Handle the request to get kategori.
     *
     * @param \Illuminate\Http\Request $request
     * @return object
     */
    public function handle(Request $request): object
    {
        $query = Kategori::query();

        // search
        if ($request->has('search')) {
            $query->where('nama', 'like', '%' . $request->search . '%');
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

        // paginate
        $data =  $query->paginate($perPage)->appends($request->all());

        return $data;
    }
}
