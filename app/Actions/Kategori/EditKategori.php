<?php

namespace App\Actions\Kategori;

use App\Models\Kategori;

class EditKategori
{
    /**
     * Edit a kategori.
     *
     * @param array $validatedData
     * @param \App\Models\Kategori $kategori
     * @return \App\Models\Kategori
     */
    public function handle(Kategori $kategori, array $validatedData): bool
    {
        return $kategori->update($validatedData);
    }
}
