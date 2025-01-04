import { Head, Link } from '@inertiajs/react';
import { CircleChevronLeft } from 'lucide-react';

import { formatCurrency, formatedDate } from '@/lib/utils';
import { Barang, PageProps } from '@/types';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import AuthLayout from '@/layouts/auth-layout';

interface DetailBarangProps extends PageProps {
    barang: Barang;
}

function DetailBarang({ barang }: DetailBarangProps) {
    // states
    const createdAt = formatedDate(barang.created_at!);
    const updatedAt = formatedDate(barang.updated_at!);

    return (
        <AuthLayout
            title="Detail Barang"
            subtitle="Halaman ini digunakan untuk melihat detail barang."
        >
            <Head title="Detail barang" />

            <Button asChild className="mb-5">
                <Link href={route('barang.index')}>
                    <CircleChevronLeft />
                    <span>Kembali</span>
                </Link>
            </Button>
            <div className="flex w-full flex-col gap-5">
                <img
                    src={`/storage/${barang.gambar}`}
                    alt={`@${barang.nama}`}
                    className="h-[400px] w-full rounded-md object-cover"
                />

                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Kode</TableCell>
                                <TableCell>: {barang.kode}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Nama</TableCell>
                                <TableCell>: {barang.nama}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Stok</TableCell>
                                <TableCell>
                                    : {barang.stok}{' '}
                                    <span className="font-semibold">
                                        {barang.satuan}
                                    </span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Harga</TableCell>
                                <TableCell>
                                    : {formatCurrency(barang.harga)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Kategori</TableCell>
                                <TableCell>: {barang.kategori.nama}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Supplier</TableCell>
                                <TableCell>: {barang.supplier.nama}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Deskripsi</TableCell>
                                <TableCell>: {barang.deskripsi}</TableCell>
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

export default DetailBarang;
