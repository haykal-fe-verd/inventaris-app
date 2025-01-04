<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Kategori extends Model
{
    /** @use HasFactory<\Database\Factories\KategoriFactory> */
    use HasFactory, LogsActivity;

    protected $table = 'tb_kategori';
    protected $fillable = [
        'nama',
    ];

    // log activity
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['*']);
    }


    // relasi
    public function barang(): HasMany
    {
        return $this->hasMany(Barang::class, 'id_kategori');
    }
}
