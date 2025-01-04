import { Head, Link } from '@inertiajs/react';
import { CircleChevronLeft } from 'lucide-react';

import { formatCurrency, formatedDate, formatedDateSimple } from '@/lib/utils';
import { BarangMasuk, PageProps } from '@/types';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import AuthLayout from '@/layouts/auth-layout';

interface DetailBarangMasukProps extends PageProps {
    barangMasuk: BarangMasuk;
}

function DetailBarangMasuk({ barangMasuk }: DetailBarangMasukProps) {
    // states
    const createdAt = formatedDate(barangMasuk.created_at!);
    const updatedAt = formatedDate(barangMasuk.updated_at!);
    const tanggalMasuk = formatedDateSimple(barangMasuk.tanggal_masuk);

    return (
        <AuthLayout
            title="Detail Barang Masuk"
            subtitle="Halaman ini digunakan untuk melihat detail barang masuk."
        >
            <Head title="Detail barang masuk" />

            <Button asChild className="mb-5">
                <Link href={route('barang-masuk.index')}>
                    <CircleChevronLeft />
                    <span>Kembali</span>
                </Link>
            </Button>
            <div className="flex w-full flex-col gap-5">
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Kode Barang Masuk</TableCell>
                                <TableCell>
                                    : {barangMasuk.kode_barang_masuk}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Kode Barang</TableCell>
                                <TableCell>
                                    : {barangMasuk.barang.kode}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Nama Barang</TableCell>
                                <TableCell>
                                    : {barangMasuk.barang.nama}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Tanggal Masuk</TableCell>
                                <TableCell>: {tanggalMasuk}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Harga Barang</TableCell>
                                <TableCell>
                                    : {formatCurrency(barangMasuk.barang.harga)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Jumlah</TableCell>
                                <TableCell>
                                    : {barangMasuk.jumlah}{' '}
                                    <span className="font-semibold">
                                        {barangMasuk.barang.satuan}
                                    </span>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Kategori</TableCell>
                                <TableCell>
                                    : {barangMasuk.barang.kategori.nama}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Supplier</TableCell>
                                <TableCell>
                                    : {barangMasuk.supplier.nama}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Keterangan</TableCell>
                                <TableCell>
                                    : {barangMasuk.keterangan}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Dibuat</TableCell>
                                <TableCell>: {createdAt}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Diedit</TableCell>
                                <TableCell>: {updatedAt}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AuthLayout>
    );
}

export default DetailBarangMasuk;
