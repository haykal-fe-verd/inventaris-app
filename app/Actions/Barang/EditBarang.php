<?php

namespace App\Actions\Barang;

use App\Models\Barang;

class EditBarang
{
    /**
     * Edit a barang.
     *
     * @param array $validatedData
     * @param \App\Models\Barang $barang
     * @return bool
     */
    public function handle(Barang $barang, array $validatedData): bool
    {
        return $barang->update($validatedData);
    }
}
