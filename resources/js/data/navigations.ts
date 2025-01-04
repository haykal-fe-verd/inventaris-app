import {
    Blocks,
    Box,
    FolderDown,
    Layers,
    LucideIcon,
    Settings2,
    Truck,
} from 'lucide-react';

export type NavigationItem = {
    name: string;
    url: string;
    icon?: LucideIcon;
    child?: NavigationItem[];
    role?: string[];
    permission?: string[];
};

export type Navigation = {
    label: string;
    items: NavigationItem[];
    role?: string[];
};

export const navigations: Navigation[] = [
    {
        label: 'Master',
        items: [
            {
                name: 'Dashboard',
                url: route('dashboard'),
                icon: Blocks,
            },
            {
                name: 'Kategori',
                url: route('kategori.index'),
                icon: Layers,
                permission: ['view_kategori'],
            },
            {
                name: 'Supplier',
                url: route('supplier.index'),
                icon: Truck,
                permission: ['view_supplier'],
            },
            {
                name: 'Barang',
                url: '#',
                icon: Box,
                permission: [
                    'view_barang',
                    'view_barang_masuk',
                    'view_barang_keluar',
                ],
                child: [
                    {
                        name: 'Data Barang',
                        url: route('barang.index'),
                        permission: ['view_barang'],
                    },
                    {
                        name: 'Barang Masuk',
                        url: route('barang-masuk.index'),
                        permission: ['view_barang_masuk'],
                    },
                    {
                        name: 'Barang Keluar',
                        url: route('barang-keluar.index'),
                        permission: ['view_barang_keluar'],
                    },
                ],
            },
        ],
        role: ['admin', 'petugas'],
    },

    {
        label: 'Other',
        items: [
            {
                name: 'Laporan',
                url: '#',
                icon: FolderDown,
                permission: [
                    'view_laporan_pemasukan',
                    'view_laporan_pengeluaran',
                ],
                child: [
                    {
                        name: 'Barang Masuk',
                        url: route('laporan-barang-masuk.index'),
                        permission: ['view_laporan_pemasukan'],
                    },
                    {
                        name: 'Barang Keluar',
                        url: route('laporan-barang-keluar.index'),
                        permission: ['view_laporan_pengeluaran'],
                    },
                ],
            },
            {
                name: 'Pengaturan',
                url: '#',
                icon: Settings2,
                permission: ['view_aktivitas', 'view_user'],
                child: [
                    {
                        name: 'Manajemen User',
                        url: route('user.index'),
                        permission: ['view_user'],
                    },
                    {
                        name: 'Aktivitas',
                        url: route('aktivitas.index'),
                        permission: ['view_aktivitas'],
                    },
                ],
            },
        ],
        role: ['admin', 'petugas'],
    },
];
