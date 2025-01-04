import { Head, Link, router, usePage } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';

import { hasPermissions } from '@/lib/utils';
import {
    BarangMasuk,
    PageProps,
    Pagination,
    Supplier,
    TableHeaderType,
} from '@/types';

import TableData from '@/components/table-data';
import TableNodata from '@/components/table-nodata';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import AuthLayout from '@/layouts/auth-layout';
import TableAction from './table-action';

interface ResponseData extends Pagination {
    data: BarangMasuk[];
}

interface BarangMasukIndexProps extends PageProps {
    data: ResponseData;
    supplier: Supplier[];
}

function BarangMasukIndex() {
    // hooks
    const { data, auth, supplier } = usePage<BarangMasukIndexProps>().props;

    // states
    const header: TableHeaderType[] = [
        { name: 'No', className: 'w-10 text-center' },
        { name: 'Kode Barang Masuk', className: '' },
        { name: 'Nama Barang', className: '' },
        { name: 'Tanggal Masuk', className: '' },
        { name: 'Jumlah', className: '' },
        { name: 'Supplier', className: '' },
        { name: '@', className: 'text-center w-10' },
    ];
    const filterData = [{ name: 'Semua', value: '' }];
    supplier?.forEach((item: Supplier) => {
        filterData.push({ name: item.nama, value: item.nama });
    });
    const sortData = [
        { name: 'Bawaan', value: '' },
        { name: 'Terbaru', value: 'created_at' },
        { name: 'Jumlah', value: 'jumlah' },
    ];

    const canView = hasPermissions(auth.user.permissions!, [
        'view_barang_masuk',
    ]);
    const canAdd = hasPermissions(auth.user.permissions!, [
        'insert_barang_masuk',
    ]);

    const canDelete = hasPermissions(auth.user.permissions!, [
        'delete_barang_masuk',
    ]);

    // events
    const handleDelete = (id: number) => {
        router.delete(route('barang-masuk.destroy', id), {
            onSuccess: () => {
                //
            },
        });
    };

    return (
        <AuthLayout
            title="Daftar Barang Masuk"
            subtitle="Halaman ini digunakan untuk manajemen barang masuk."
        >
            <Head title="Daftar Barang Masuk" />
            <div className="flex flex-col gap-12">
                {canAdd && (
                    <Button asChild className="w-fit">
                        <Link
                            href={route('barang-masuk.create')}
                            className="flex items-center justify-center gap-2"
                        >
                            <CirclePlus />
                            Tambah Barang Masuk
                        </Link>
                    </Button>
                )}
                <TableData
                    header={header}
                    filterData={filterData}
                    sortData={sortData}
                    link="barang-masuk.index"
                    from={data.from}
                    to={data.to}
                    total={data.total}
                    links={data.links}
                    prev_page_url={data.prev_page_url}
                    next_page_url={data.next_page_url}
                >
                    {data?.data?.length > 0 ? (
                        data?.data.map((item, index: number) => (
                            <TableRow key={item.id}>
                                <TableCell className="text-center">
                                    {data.from! + index}
                                </TableCell>
                                <TableCell className="">
                                    {item.kode_barang_masuk}
                                </TableCell>
                                <TableCell className="capitalize">
                                    {item.barang.nama}
                                </TableCell>
                                <TableCell className="">
                                    {(() => {
                                        const date = new Date(
                                            item.tanggal_masuk,
                                        );
                                        const day = String(
                                            date.getDate(),
                                        ).padStart(2, '0');
                                        const month = String(
                                            date.getMonth() + 1,
                                        ).padStart(2, '0');
                                        const year = date.getFullYear();
                                        return `${day}-${month}-${year}`;
                                    })()}
                                </TableCell>
                                <TableCell className="">
                                    {item.jumlah}{' '}
                                    <span className="font-semibold">
                                        {item.barang.satuan}
                                    </span>
                                </TableCell>
                                <TableCell className="">
                                    {item.supplier.nama}
                                </TableCell>
                                <TableCell className="text-center">
                                    <TableAction
                                        canView={canView}
                                        canDelete={canDelete}
                                        barangMasuk={item}
                                        handleDelete={handleDelete}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableNodata span={header.length} />
                    )}
                </TableData>
            </div>
        </AuthLayout>
    );
}

export default BarangMasukIndex;
