<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Supplier extends Model
{
    /** @use HasFactory<\Database\Factories\SupplierFactory> */
    use HasFactory, LogsActivity;

    protected $table = 'tb_supplier';
    protected $fillable = [
        'nama',
        'email',
        'no_hp',
        'alamat'
    ];

    // log activity
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['*']);
    }

    // relasi
    public function barang()
    {
        return $this->hasMany(Barang::class, 'id_supplier');
    }
}
