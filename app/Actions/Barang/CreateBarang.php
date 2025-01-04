<?php

namespace App\Actions\Barang;

use App\Models\Barang;

class CreateBarang
{
    /**
     * Create a new barang.
     *
     * @param array $validatedData
     * @return \App\Models\Barang
     * @throws \Exception
     */
    public function handle(array $validatedData): Barang
    {
        return Barang::create([
            'kode' => $validatedData['kode'],
            'nama' => $validatedData['nama'],
            'stok' => $validatedData['stok'],
            'harga' => $validatedData['harga'],
            'satuan' => $validatedData['satuan'],
            'deskripsi' => $validatedData['deskripsi'],
            'gambar' => $validatedData['gambar'],
            'id_kategori' => $validatedData['id_kategori'],
            'id_supplier' => $validatedData['id_supplier'],
        ]);
    }
}
