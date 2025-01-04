<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Barang>
 */
class BarangFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $satuan = [
            'Pcs',
            'Box',
            'Kg',
            'Liter',
            'Dus',
            'Roll',
            'Set',
        ];

        return [
            'kode' => $this->faker->unique()->bothify('BRG###'),
            'nama' => $this->faker->word(),
            'stok' => $this->faker->numberBetween(10, 100),
            'harga' => $this->faker->numberBetween(10000, 100000),
            'satuan' => $satuan[array_rand($satuan)],
            'deskripsi' => $this->faker->sentence(),
            'gambar' => $this->faker->imageUrl(640, 480, 'products', true, 'Barang'),
            'id_kategori' => \App\Models\Kategori::all()->random()->id,
            'id_supplier' => \App\Models\Supplier::all()->random()->id,
        ];
    }
}
