import { Head, Link, router, usePage } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';

import { formatedDateSimple, hasPermissions, truncateText } from '@/lib/utils';
import {
    BarangKeluar,
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
    data: BarangKeluar[];
}

interface BarangKeluarIndexProps extends PageProps {
    data: ResponseData;
    supplier: Supplier[];
}

function BarangKeluarIndex() {
    // hooks
    const { data, auth, supplier } = usePage<BarangKeluarIndexProps>().props;

    // states
    const header: TableHeaderType[] = [
        { name: 'No', className: 'w-10 text-center' },
        { name: 'Kode Barang Keluar', className: '' },
        { name: 'Nama Barang', className: '' },
        { name: 'Tanggal Keluar', className: '' },
        { name: 'Jumlah', className: '' },
        { name: 'Supplier', className: '' },
        { name: 'Tujuan', className: '' },
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
        'view_barang_keluar',
    ]);
    const canAdd = hasPermissions(auth.user.permissions!, [
        'insert_barang_keluar',
    ]);

    const canDelete = hasPermissions(auth.user.permissions!, [
        'delete_barang_keluar',
    ]);

    // events
    const handleDelete = (id: number) => {
        router.delete(route('barang-keluar.destroy', id), {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthLayout
            title="Daftar Barang Keluar"
            subtitle="Halaman ini digunakan untuk manajemen barang keluar."
        >
            <Head title="Daftar Barang Keluar" />
            <div className="flex flex-col gap-12">
                {canAdd && (
                    <Button asChild className="w-fit">
                        <Link
                            href={route('barang-keluar.create')}
                            className="flex items-center justify-center gap-2"
                        >
                            <CirclePlus />
                            Tambah Barang Keluar
                        </Link>
                    </Button>
                )}
                <TableData
                    header={header}
                    filterData={filterData}
                    sortData={sortData}
                    link="barang-keluar.index"
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
                                    {item.kode_barang_keluar}
                                </TableCell>
                                <TableCell className="capitalize">
                                    {item.barang.nama}
                                </TableCell>
                                <TableCell className="">
                                    {formatedDateSimple(item.tanggal_keluar)}
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
                                <TableCell className="">
                                    {truncateText(item.tujuan, 20)}
                                </TableCell>
                                <TableCell className="text-center">
                                    <TableAction
                                        canView={canView}
                                        canDelete={canDelete}
                                        barangKeluar={item}
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

export default BarangKeluarIndex;
