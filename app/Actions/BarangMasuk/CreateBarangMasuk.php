<?php

namespace App\Actions\BarangMasuk;

use App\Models\Barang;
use App\Models\BarangMasuk;
use Illuminate\Support\Facades\DB;

class CreateBarangMasuk
{
    /**
     * Execute the action.
     *
     * @param array $validatedData
     * @return void
     * @throws \Exception
     */
    public function handle(array $validatedData): void
    {
        DB::beginTransaction();

        try {
            $barangIds = array_column($validatedData['barang'], 'id');
            $barangData = Barang::whereIn('id', $barangIds)->get()->keyBy('id');

            foreach ($validatedData['barang'] as $barang) {
                BarangMasuk::create([
                    'kode_barang_masuk' => $validatedData['kode_barang_masuk'],
                    'tanggal_masuk' => $validatedData['tanggal_masuk'],
                    'id_supplier' => $validatedData['id_supplier'],
                    'keterangan' => $validatedData['keterangan'],
                    'id_barang' => $barang['id'],
                    'jumlah' => $barang['jumlah'],
                ]);

                $barangData[$barang['id']]->stok += $barang['jumlah'];
                $barangData[$barang['id']]->save();
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
