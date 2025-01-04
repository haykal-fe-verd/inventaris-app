<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_barang', function (Blueprint $table) {
            $table->id();
            $table->string('kode')->unique();
            $table->string('nama');
            $table->integer('stok');
            $table->integer('harga');
            $table->string('satuan');
            $table->text('deskripsi')->nullable();
            $table->string('gambar')->nullable();

            $table->foreignId('id_kategori')->constrained('tb_kategori')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('id_supplier')->constrained('tb_supplier')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_barang');
    }
};
