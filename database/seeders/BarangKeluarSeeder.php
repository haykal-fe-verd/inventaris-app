<?php

namespace Database\Seeders;

use App\Models\BarangKeluar;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BarangKeluarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BarangKeluar::factory(20)->create();
    }
}
