import { Head, Link } from '@inertiajs/react';
import { CircleChevronLeft, QrCode } from 'lucide-react';
import React from 'react';
import QRCode from 'react-qr-code';
import { useReactToPrint } from 'react-to-print';

import { formatCurrency, formatedDate, formatedDateSimple } from '@/lib/utils';
import { BarangKeluar, PageProps } from '@/types';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import AuthLayout from '@/layouts/auth-layout';

interface DetailBarangKeluarProps extends PageProps {
    barangKeluar: BarangKeluar;
}

function DetailBarangKeluar({ barangKeluar }: DetailBarangKeluarProps) {
    // states
    const createdAt = formatedDate(barangKeluar.created_at!);
    const updatedAt = formatedDate(barangKeluar.updated_at!);
    const tanggalKeluar = formatedDateSimple(barangKeluar.tanggal_keluar);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    return (
        <AuthLayout
            title="Detail Barang Keluar"
            subtitle="Halaman ini digunakan untuk melihat detail barang keluar."
        >
            <Head title="Detail barang keluar" />

            <div className="mb-5 flex items-center gap-3">
                <Button asChild>
                    <Link href={route('barang-keluar.index')}>
                        <CircleChevronLeft />
                        <span>Kembali</span>
                    </Link>
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => reactToPrintFn()}
                >
                    <QrCode />
                    <span>Cetak QR</span>
                </Button>
            </div>

            <div className="grid grid-cols-5 gap-5">
                <div className="col-span-5 w-full overflow-hidden rounded-md border lg:col-span-4">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Kode Barang Keluar</TableCell>
                                <TableCell>
                                    : {barangKeluar.kode_barang_keluar}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Kode Barang</TableCell>
                                <TableCell>
                                    : {barangKeluar.barang.kode}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Nama Barang</TableCell>
                                <TableCell className="capitalize">
                                    : {barangKeluar.barang.nama}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Tanggal Keluar</TableCell>
                                <TableCell>: {tanggalKeluar}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Harga Barang</TableCell>
                                <TableCell>
                                    :{' '}
                                    {formatCurrency(barangKeluar.barang.harga)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Jumlah</TableCell>
                                <TableCell>
                                    : {barangKeluar.jumlah}{' '}
                                    <span className="font-semibold">
                                        {barangKeluar.barang.satuan}
                                    </span>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Kategori</TableCell>
                                <TableCell>
                                    : {barangKeluar.barang.kategori.nama}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Supplier</TableCell>
                                <TableCell>
                                    : {barangKeluar.supplier.nama}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Keterangan</TableCell>
                                <TableCell>
                                    : {barangKeluar.keterangan}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Tujuan</TableCell>
                                <TableCell>: {barangKeluar.tujuan}</TableCell>
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

                <div
                    ref={contentRef}
                    className="col-span-5 flex w-full flex-col items-center justify-center overflow-hidden rounded-md border p-5 lg:col-span-1"
                >
                    <QRCode
                        value={route('barang-keluar.qr', barangKeluar.id)}
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <h1 className="mt-5 block text-center font-semibold">
                        {import.meta.env.VITE_APP_URL}
                    </h1>
                </div>
            </div>
        </AuthLayout>
    );
}

export default DetailBarangKeluar;
