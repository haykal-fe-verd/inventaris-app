<?php

namespace App\Actions\Kategori;

use App\Models\Kategori;

class DeleteKategori
{
    /**
     * Handle the deletion of a kategori.
     *
     * @param \App\Models\Kategori $kategori
     * @return bool
     */
    public function handle(Kategori $kategori): bool
    {
        return $kategori->delete();
    }
}
