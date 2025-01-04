import { Head } from '@inertiajs/react';

import { formatCurrency, formatedDate, formatedDateSimple } from '@/lib/utils';
import { BarangKeluar, PageProps } from '@/types';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import GuestLayout from '@/layouts/guest-layout';

interface QrPageProps extends PageProps {
    barangKeluar: BarangKeluar;
}

function QrPage({ barangKeluar }: QrPageProps) {
    return (
        <GuestLayout>
            <Head title="QR" />

            <section id="qr">
                <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-5">
                    <h1 className="text-7xl font-extrabold capitalize tracking-tight text-primary lg:text-9xl">
                        {barangKeluar.barang.nama}
                    </h1>

                    <Card className="text-left">
                        <CardContent className="mt-6">
                            <div className="col-span-5 w-full overflow-hidden rounded-md border lg:col-span-4">
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                Tanggal Keluar
                                            </TableCell>
                                            <TableCell>
                                                :{' '}
                                                {formatedDateSimple(
                                                    barangKeluar.tanggal_keluar,
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Kode Barang Keluar
                                            </TableCell>
                                            <TableCell>
                                                :{' '}
                                                {
                                                    barangKeluar.kode_barang_keluar
                                                }
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
                                            <TableCell>Harga Barang</TableCell>
                                            <TableCell>
                                                :{' '}
                                                {formatCurrency(
                                                    barangKeluar.barang.harga,
                                                )}
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
                                                :{' '}
                                                {
                                                    barangKeluar.barang.kategori
                                                        .nama
                                                }
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
                                            <TableCell>
                                                : {barangKeluar.tujuan}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Dibuat</TableCell>
                                            <TableCell>
                                                :{' '}
                                                {formatedDate(
                                                    barangKeluar.created_at!,
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Diedit</TableCell>
                                            <TableCell>
                                                :{' '}
                                                {formatedDate(
                                                    barangKeluar.updated_at!,
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </GuestLayout>
    );
}

export default QrPage;
