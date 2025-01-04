import { Head, Link, router, usePage } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';

import { formatCurrency, hasPermissions } from '@/lib/utils';
import {
    Barang,
    Kategori,
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
    data: Barang[];
}

interface BarangIndexProps extends PageProps {
    data: ResponseData;
    kategori: Kategori[];
    supplier: Supplier[];
}

function BarangIndex() {
    // hooks
    const { data, auth, kategori, supplier } =
        usePage<BarangIndexProps>().props;

    // states
    const header: TableHeaderType[] = [
        { name: 'No', className: 'w-10 text-center' },
        { name: 'Kode', className: '' },
        { name: 'Nama', className: '' },
        { name: 'Harga', className: '' },
        { name: 'Stok', className: '' },
        { name: 'Kategori', className: '' },
        { name: 'Supplier', className: '' },
        { name: '@', className: 'text-center w-10' },
    ];
    const filterData = [{ name: 'Semua', value: '' }];
    kategori?.forEach((item: Kategori) => {
        filterData.push({ name: item.nama, value: item.nama });
    });
    supplier?.forEach((item: Supplier) => {
        filterData.push({ name: item.nama, value: item.nama });
    });
    const sortData = [
        { name: 'Bawaan', value: '' },
        { name: 'Terbaru', value: 'created_at' },
        { name: 'Nama', value: 'nama' },
        { name: 'Harga', value: 'harga' },
    ];

    const canView = hasPermissions(auth.user.permissions!, ['view_barang']);
    const canAdd = hasPermissions(auth.user.permissions!, ['insert_barang']);
    const canEdit = hasPermissions(auth.user.permissions!, ['update_barang']);
    const canDelete = hasPermissions(auth.user.permissions!, ['delete_barang']);

    // events
    const handleDelete = (id: number) => {
        router.delete(route('barang.destroy', id), {
            onSuccess: () => {
                //
            },
        });
    };

    return (
        <AuthLayout
            title="Daftar Barang"
            subtitle="Halaman ini digunakan untuk manajemen barang"
        >
            <Head title="Daftar Barang" />
            <div className="flex flex-col gap-12">
                {canAdd && (
                    <Button asChild className="w-fit">
                        <Link
                            href={route('barang.create')}
                            className="flex items-center justify-center gap-2"
                        >
                            <CirclePlus />
                            Tambah Barang
                        </Link>
                    </Button>
                )}
                <TableData
                    header={header}
                    filterData={filterData}
                    sortData={sortData}
                    link="barang.index"
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
                                <TableCell className="">{item.kode}</TableCell>
                                <TableCell className="">{item.nama}</TableCell>
                                <TableCell className="">
                                    {formatCurrency(item.harga)}
                                </TableCell>
                                <TableCell className="">
                                    {item.stok}{' '}
                                    <span className="font-semibold">
                                        {item.satuan}
                                    </span>
                                </TableCell>
                                <TableCell className="">
                                    {item.kategori.nama}
                                </TableCell>
                                <TableCell className="">
                                    {item.supplier.nama}
                                </TableCell>
                                <TableCell className="text-center">
                                    <TableAction
                                        canView={canView}
                                        canEdit={canEdit}
                                        canDelete={canDelete}
                                        barang={item}
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

export default BarangIndex;
