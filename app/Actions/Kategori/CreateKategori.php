<?php

namespace App\Actions\Kategori;

use App\Models\Kategori;

class CreateKategori
{
    /**
     * Create a new kategori.
     *
     * @param array $validatedData
     * @return \App\Models\Kategori
     * @throws \Exception
     */
    public function handle(array $validatedData): Kategori
    {
        return Kategori::create($validatedData);
    }
}
