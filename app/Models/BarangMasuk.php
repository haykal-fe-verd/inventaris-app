<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class BarangMasuk extends Model
{
    /** @use HasFactory<\Database\Factories\BarangMasukFactory> */
    use HasFactory, LogsActivity;

    protected $table = 'tb_barang_masuk';
    protected $fillable = [
        'kode_barang_masuk',
        'tanggal_masuk',
        'jumlah',
        'keterangan',
        'id_barang',
        'id_supplier',
    ];

    // log activity
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['*']);
    }

    // relasi
    public function barang(): BelongsTo
    {
        return $this->belongsTo(Barang::class, 'id_barang');
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class, 'id_supplier');
    }
}
