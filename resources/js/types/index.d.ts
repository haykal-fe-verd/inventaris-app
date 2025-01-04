import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    avatar?: string | File | null | undefined;
    roles: string[];
    permissions?: string[];
}

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at?: string;
    updated_at?: string;
}

export interface Roles {
    id: number;
    name: string;
    guard_name: string;
    created_at?: string;
    updated_at?: string;
}

export interface Link {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Pagination {
    current_page?: number;
    path?: string;
    first_page_url?: string;
    last_page_url?: string;
    next_page_url?: string | null;
    prev_page_url?: string | null;
    from?: number;
    to?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
    links?: Link[];
}

export interface Sessions {
    message?: string;
    success?: string;
    error?: string;
}

export interface TableHeaderType {
    name: string;
    className?: string;
}

export interface Kategori {
    id: number;
    nama: string;
    created_at?: string;
    updated_at?: string;
}

export interface Supplier {
    id: number;
    nama: string;
    email: string;
    no_hp?: string;
    alamat?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Barang {
    id: number;
    id_kategori: number;
    id_supplier: number;
    kode: string;
    nama: string;
    harga: number;
    stok: number;
    satuan: string;
    deskripsi?: string;
    gambar?: any;
    kategori: Kategori;
    supplier: Supplier;
    created_at?: string;
    updated_at?: string;
}

export interface BarangMasuk {
    id: number;
    id_barang: number;
    id_supplier: number;
    kode_barang_masuk: string;
    tanggal_masuk: string;
    jumlah: number;
    keterangan?: string;
    supplier: Supplier;
    barang: Barang;
    created_at?: string;
    updated_at?: string;
}

export interface BarangKeluar {
    id: number;
    id_barang: number;
    id_supplier: number;
    kode_barang_keluar: string;
    tanggal_keluar: string;
    jumlah: number;
    tujuan: string;
    keterangan?: string;
    supplier: Supplier;
    barang: Barang;
    created_at?: string;
    updated_at?: string;
}

export interface Aktivitas {
    id: number;
    log_name: string;
    description: string;
    subject_type: string;
    event: string;
    subject_id: number;
    causer_type: string;
    causer_id: number;
    properties: {
        attributes: {
            [key: string]: any;
        };
    };
    created_at: string;
    updated_at: string;
    causer?: User;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    sessions: Sessions;
    status: string;
};
