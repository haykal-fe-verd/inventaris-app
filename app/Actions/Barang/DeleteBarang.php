<?php

namespace App\Actions\Barang;

use App\Models\Barang;

class DeleteBarang
{
    /**
     * Handle the deletion of a barang.
     *
     * @param \App\Models\Barang $barang
     * @return bool
     */
    public function handle(Barang $barang): bool
    {
        return $barang->delete();
    }
}
