import { Head, router, usePage } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';
import React from 'react';

import { hasPermissions, truncateText } from '@/lib/utils';
import {
    PageProps,
    Pagination,
    Supplier as SupplierType,
    TableHeaderType,
} from '@/types';

import TableData from '@/components/table-data';
import TableNodata from '@/components/table-nodata';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import AuthLayout from '@/layouts/auth-layout';
import CreateSupplier from './create';
import DetailSupplier from './detail';
import EditSupplier from './edit';
import TableAction from './table-action';

interface ResponseData extends Pagination {
    data: SupplierType[];
}

interface SupplierProps extends PageProps {
    data: ResponseData;
}

function Supplier() {
    // hooks
    const { auth, data } = usePage<SupplierProps>().props;

    // states
    const header: TableHeaderType[] = [
        { name: 'No', className: 'w-10 text-center' },
        { name: 'Nama', className: '' },
        { name: 'Email', className: '' },
        { name: 'No HP', className: '' },
        { name: 'Alamat', className: '' },
        { name: '@', className: 'text-center w-10' },
    ];
    const sortData = [
        { name: 'Bawaan', value: '' },
        { name: 'Terbaru', value: 'created_at' },
        { name: 'Nama', value: 'nama' },
        { name: 'Email', value: 'email' },
        { name: 'No HP', value: 'no_hp' },
    ];

    const canView = hasPermissions(auth.user.permissions!, ['view_supplier']);
    const canAdd = hasPermissions(auth.user.permissions!, ['insert_supplier']);
    const canEdit = hasPermissions(auth.user.permissions!, ['update_supplier']);
    const canDelete = hasPermissions(auth.user.permissions!, [
        'delete_supplier',
    ]);

    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [isDetail, setIsDetail] = React.useState<boolean>(false);
    const [detailData, setDetailData] = React.useState<SupplierType>();
    const [isEdit, setIsEdit] = React.useState<boolean>(false);
    const [editData, setEditData] = React.useState<SupplierType>();
    const [isAdd, setIsAdd] = React.useState<boolean>(false);

    // events
    const handleModalClose = () => {
        setIsDetail(false);
        setIsAdd(false);
        setIsEdit(false);
        setDetailData(undefined);
        setEditData(undefined);
    };

    const handleDelete = (id: number) => {
        router.delete(route('supplier.destroy', id));
    };

    return (
        <AuthLayout
            title="Supplier"
            subtitle="Halaman ini digunakan untuk manajemen supplier"
        >
            <Head title="Supplier" />

            <Dialog
                open={openModal}
                onOpenChange={(isOpen) => {
                    setOpenModal(isOpen);
                    if (!isOpen) {
                        handleModalClose();
                    }
                }}
            >
                <div className="flex flex-col gap-12">
                    {canAdd && (
                        <Button
                            onClick={() => {
                                setOpenModal(true);
                                setIsAdd(true);
                            }}
                            className="flex w-fit items-center justify-center gap-2"
                        >
                            <CirclePlus />
                            <span> Tambah Supplier</span>
                        </Button>
                    )}

                    <TableData
                        header={header}
                        isFilter={false}
                        sortData={sortData}
                        link="supplier.index"
                        from={data.from}
                        to={data.to}
                        total={data.total}
                        links={data.links}
                        prev_page_url={data.prev_page_url}
                        next_page_url={data.next_page_url}
                    >
                        {data?.data?.length > 0 ? (
                            data?.data.map(
                                (supplier: SupplierType, index: number) => (
                                    <TableRow key={supplier.id}>
                                        <TableCell className="text-center">
                                            {data.from! + index}
                                        </TableCell>
                                        <TableCell className="capitalize">
                                            {supplier.nama}
                                        </TableCell>
                                        <TableCell className="">
                                            {supplier.email}
                                        </TableCell>
                                        <TableCell className="capitalize">
                                            {supplier.no_hp ?? '-'}
                                        </TableCell>
                                        <TableCell className="capitalize">
                                            {truncateText(supplier?.alamat, 20)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <TableAction
                                                supplier={supplier}
                                                canView={canView}
                                                canEdit={canEdit}
                                                canDelete={canDelete}
                                                setIsDetail={setIsDetail}
                                                setIsEdit={setIsEdit}
                                                setDetailData={setDetailData}
                                                setEditData={setEditData}
                                                handleDelete={handleDelete}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ),
                            )
                        ) : (
                            <TableNodata span={header.length} />
                        )}
                    </TableData>
                </div>

                {/* detail */}
                {isDetail && detailData && (
                    <DetailSupplier supplier={detailData!} />
                )}

                {/* create */}
                {isAdd && (
                    <CreateSupplier
                        setOpenModal={setOpenModal}
                        setIsAdd={setIsAdd}
                    />
                )}

                {/* update */}
                {isEdit && editData && (
                    <EditSupplier
                        setOpenModal={setOpenModal}
                        setIsEdit={setIsEdit}
                        editData={editData}
                    />
                )}
            </Dialog>
        </AuthLayout>
    );
}

export default Supplier;
