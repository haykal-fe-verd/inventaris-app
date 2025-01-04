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
        Schema::create('tb_barang_keluar', function (Blueprint $table) {
            $table->id();
            $table->string('kode_barang_keluar');
            $table->date('tanggal_keluar');
            $table->integer('jumlah');
            $table->text('tujuan');
            $table->text('keterangan')->nullable();

            $table->foreignId('id_barang')->constrained('tb_barang')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('id_supplier')->constrained('tb_supplier')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_barang_keluar');
    }
};
