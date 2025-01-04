import { Head, usePage } from '@inertiajs/react';

import {
    Aktivitas as AktivitasType,
    PageProps,
    Pagination,
    TableHeaderType,
} from '@/types';

import TableData from '@/components/table-data';
import TableNodata from '@/components/table-nodata';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TableCell, TableRow } from '@/components/ui/table';
import AuthLayout from '@/layouts/auth-layout';
import { getInitial } from '@/lib/utils';

interface ResponseData extends Pagination {
    data: AktivitasType[];
}
interface AktivitasProps extends PageProps {
    data: ResponseData;
}

function Aktivitas() {
    // hooks
    const { data } = usePage<AktivitasProps>().props;

    // states
    const header: TableHeaderType[] = [
        { name: 'No', className: 'w-10 text-center' },
        { name: 'Aktivitas', className: '' },
        { name: 'Foto', className: 'w-40' },
        { name: 'Dilakukan Oleh', className: 'w-40' },
        { name: 'Waktu', className: 'w-80' },
    ];

    return (
        <AuthLayout
            title="Aktivitas"
            subtitle="Halaman ini digunakan untuk manajemen aktivitas pengguna."
        >
            <Head title="Aktivitas" />

            <div className="flex flex-col gap-12">
                <TableData
                    header={header}
                    isFilter={false}
                    isSort={false}
                    link="aktivitas.index"
                    from={data.from}
                    to={data.to}
                    total={data.total}
                    links={data.links}
                    prev_page_url={data.prev_page_url}
                    next_page_url={data.next_page_url}
                >
                    {data?.data?.length > 0 ? (
                        data?.data.map((item: AktivitasType, index: number) => (
                            <TableRow key={item.id}>
                                <TableCell className="text-center">
                                    {data.from! + index}
                                </TableCell>
                                <TableCell className="capitalize">
                                    <strong>{item.event}</strong> pada{' '}
                                    <span className="font-semibold">
                                        {item.subject_type.split('\\').pop()}
                                    </span>
                                    {item.properties?.attributes?.nama
                                        ? ` (${item.properties.attributes.nama})`
                                        : ''}
                                </TableCell>
                                <TableCell className="capitalize">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src={`/storage/${item?.causer?.avatar as string}`}
                                            alt={item?.causer?.name}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            {getInitial(
                                                item?.causer?.name as string,
                                            )}
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="capitalize">
                                    {item.causer ? (
                                        <span>{item.causer.name}</span>
                                    ) : (
                                        'Sistem'
                                    )}
                                </TableCell>
                                <TableCell className="capitalize">
                                    {new Date(item.created_at).toLocaleString(
                                        'id-ID',
                                        {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        },
                                    )}
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

export default Aktivitas;
