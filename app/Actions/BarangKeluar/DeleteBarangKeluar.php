<?php

namespace App\Actions\BarangKeluar;

use App\Models\BarangKeluar;

class DeleteBarangKeluar
{
    /**
     * Handle the deletion of a barang keluar.
     *
     * @param \App\Models\BarangKeluar $BarangKeluar
     * @return bool
     */
    public function handle(BarangKeluar $BarangKeluar): bool
    {
        return $BarangKeluar->delete();
    }
}
