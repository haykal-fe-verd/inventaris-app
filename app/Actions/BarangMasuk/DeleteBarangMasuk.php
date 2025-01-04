<?php

namespace App\Actions\BarangMasuk;

use App\Models\BarangMasuk;

class DeleteBarangMasuk
{
    /**
     * Handle the deletion of a barang masuk.
     *
     * @param \App\Models\BarangMasuk $BarangMasuk
     * @return bool
     */
    public function handle(BarangMasuk $BarangMasuk): bool
    {
        return $BarangMasuk->delete();
    }
}
