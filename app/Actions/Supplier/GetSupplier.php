<?php

namespace App\Actions\Supplier;

use App\Models\Supplier;
use Illuminate\Http\Request;

class GetSupplier
{
    const DEFAULT_SORT_COLUMN = 'created_at';
    const DEFAULT_PER_PAGE = 10;

    /**
     * Handle the request to get supplier.
     *
     * @param \Illuminate\Http\Request $request
     * @return object
     */
    public function handle(Request $request): object
    {
        $query = Supplier::query();

        // search
        if ($request->has('search')) {
            $query->where('nama', 'like', '%' . $request->search . '%')
                ->orWhere('email', 'like', '%' . $request->search . '%')
                ->orWhere('no_hp', 'like', '%' . $request->search . '%')
                ->orWhere('alamat', 'like', '%' . $request->search . '%');
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
