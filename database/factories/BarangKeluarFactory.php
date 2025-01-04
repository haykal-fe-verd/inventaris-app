<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BarangKeluar>
 */
class BarangKeluarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kode_barang_keluar' => $this->faker->unique()->bothify('BK###'),
            'tanggal_keluar' => $this->faker->date(),
            'jumlah' => $this->faker->numberBetween(10, 100),
            'tujuan' => $this->faker->address(),
            'keterangan' => $this->faker->sentence(),
            'id_barang' => \App\Models\Barang::all()->random()->id,
            'id_supplier' => \App\Models\Supplier::all()->random()->id,
        ];
    }
}
