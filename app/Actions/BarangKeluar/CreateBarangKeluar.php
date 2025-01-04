<?php

namespace App\Actions\BarangKeluar;

use App\Models\Barang;
use App\Models\BarangKeluar;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CreateBarangKeluar
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
            $barangData = Barang::findOrFail($validatedData['id_barang']);

            // jika stok barang tidak mencukupi
            if ($barangData->stok < $validatedData['jumlah']) {
                throw ValidationException::withMessages([
                    'jumlah' => "Jumlah barang yang diminta ({$validatedData['jumlah']}) melebihi stok tersedia ({$barangData->stok})."

                ]);
            }

            $barangData->stok -= $validatedData['jumlah'];
            $barangData->save();

            BarangKeluar::create($validatedData);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
