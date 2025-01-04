<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // kategori
        Permission::create(['name' => 'view_kategori']);
        Permission::create(['name' => 'insert_kategori']);
        Permission::create(['name' => 'update_kategori']);
        Permission::create(['name' => 'delete_kategori']);

        // supplier
        Permission::create(['name' => 'view_supplier']);
        Permission::create(['name' => 'insert_supplier']);
        Permission::create(['name' => 'update_supplier']);
        Permission::create(['name' => 'delete_supplier']);

        // barang
        Permission::create(['name' => 'view_barang']);
        Permission::create(['name' => 'insert_barang']);
        Permission::create(['name' => 'update_barang']);
        Permission::create(['name' => 'delete_barang']);

        // barang_masuk
        Permission::create(['name' => 'view_barang_masuk']);
        Permission::create(['name' => 'insert_barang_masuk']);
        Permission::create(['name' => 'delete_barang_masuk']);

        // barang_keluar
        Permission::create(['name' => 'view_barang_keluar']);
        Permission::create(['name' => 'insert_barang_keluar']);
        Permission::create(['name' => 'delete_barang_keluar']);

        // user
        Permission::create(['name' => 'view_user']);
        Permission::create(['name' => 'insert_user']);
        Permission::create(['name' => 'update_user']);
        Permission::create(['name' => 'delete_user']);

        // laporan_pemasukan
        Permission::create(['name' => 'view_laporan_pemasukan']);

        // laporan_pengeluaran
        Permission::create(['name' => 'view_laporan_pengeluaran']);

        // aktivitas
        Permission::create(['name' => 'view_aktivitas']);


        $roleAdmin = Role::create(['name' => 'admin']);
        $rolePetugas = Role::create(['name' => 'petugas']);

        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
        ]);
        $petugas = User::factory()->create([
            'name' => 'Petugas',
            'email' => 'petugas@petugas.com',
        ]);

        $admin->assignRole($roleAdmin);
        $petugas->assignRole($rolePetugas);

        $admin->givePermissionTo(Permission::all());
        $petugas->givePermissionTo([
            'view_kategori',
            'insert_kategori',
            'update_kategori',
            'delete_kategori',
        ]);
    }
}
