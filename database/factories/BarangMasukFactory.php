<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BarangMasuk>
 */
class BarangMasukFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kode_barang_masuk' => $this->faker->unique()->bothify('BM###'),
            'tanggal_masuk' => $this->faker->date(),
            'jumlah' => $this->faker->numberBetween(10, 100),
            'keterangan' => $this->faker->sentence(),
            'id_barang' => \App\Models\Barang::all()->random()->id,
            'id_supplier' => \App\Models\Supplier::all()->random()->id,
        ];
    }
}
