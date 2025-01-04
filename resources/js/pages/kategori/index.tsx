import { Head, router, usePage } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';
import React from 'react';

import { hasPermissions } from '@/lib/utils';
import {
    Kategori as KategoriType,
    PageProps,
    Pagination,
    TableHeaderType,
} from '@/types';

import TableData from '@/components/table-data';
import TableNodata from '@/components/table-nodata';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import AuthLayout from '@/layouts/auth-layout';
import CreateKategori from './create';
import DetailKategori from './detail';
import EditKategori from './edit';
import TableAction from './table-action';

interface ResponseData extends Pagination {
    data: KategoriType[];
}

interface KategoriProps extends PageProps {
    data: ResponseData;
}

function Kategori() {
    // hooks
    const { auth, data } = usePage<KategoriProps>().props;

    // states
    const header: TableHeaderType[] = [
        { name: 'No', className: 'w-10 text-center' },
        { name: 'Nama', className: '' },
        { name: '@', className: 'text-center w-10' },
    ];
    const sortData = [
        { name: 'Bawaan', value: '' },
        { name: 'Terbaru', value: 'created_at' },
        { name: 'Nama', value: 'nama' },
    ];

    const canView = hasPermissions(auth.user.permissions!, ['view_kategori']);
    const canAdd = hasPermissions(auth.user.permissions!, ['insert_kategori']);
    const canEdit = hasPermissions(auth.user.permissions!, ['update_kategori']);
    const canDelete = hasPermissions(auth.user.permissions!, [
        'delete_kategori',
    ]);

    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [isDetail, setIsDetail] = React.useState<boolean>(false);
    const [detailData, setDetailData] = React.useState<KategoriType>();
    const [isEdit, setIsEdit] = React.useState<boolean>(false);
    const [editData, setEditData] = React.useState<KategoriType>();
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
        router.delete(route('kategori.destroy', id));
    };

    return (
        <AuthLayout
            title="Kategori"
            subtitle="Halaman ini digunakan untuk manajemen kategori"
        >
            <Head title="Kategori" />

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
                            <span> Tambah Kategori</span>
                        </Button>
                    )}

                    <TableData
                        header={header}
                        isFilter={false}
                        sortData={sortData}
                        link="kategori.index"
                        from={data.from}
                        to={data.to}
                        total={data.total}
                        links={data.links}
                        prev_page_url={data.prev_page_url}
                        next_page_url={data.next_page_url}
                    >
                        {data?.data?.length > 0 ? (
                            data?.data.map(
                                (kategori: KategoriType, index: number) => (
                                    <TableRow key={kategori.id}>
                                        <TableCell className="text-center">
                                            {data.from! + index}
                                        </TableCell>
                                        <TableCell className="capitalize">
                                            {kategori.nama}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <TableAction
                                                kategori={kategori}
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
                    <DetailKategori kategori={detailData!} />
                )}

                {/* create */}
                {isAdd && (
                    <CreateKategori
                        setOpenModal={setOpenModal}
                        setIsAdd={setIsAdd}
                    />
                )}

                {/* update */}
                {isEdit && editData && (
                    <EditKategori
                        setOpenModal={setOpenModal}
                        setIsEdit={setIsEdit}
                        editData={editData}
                    />
                )}
            </Dialog>
        </AuthLayout>
    );
}

export default Kategori;
