<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class BarangKeluar extends Model
{
    /** @use HasFactory<\Database\Factories\BarangKeluarFactory> */
    use HasFactory, LogsActivity;

    protected $table = 'tb_barang_keluar';
    protected $fillable = [
        'kode_barang_keluar',
        'tanggal_keluar',
        'jumlah',
        'tujuan',
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
