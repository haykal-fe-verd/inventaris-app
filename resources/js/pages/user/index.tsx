import { Head, Link, router, usePage } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';

import { getInitial, hasPermissions } from '@/lib/utils';
import {
    PageProps,
    Pagination,
    TableHeaderType,
    User as UserType,
} from '@/types';

import TableData from '@/components/table-data';
import TableNodata from '@/components/table-nodata';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import AuthLayout from '@/layouts/auth-layout';
import TableAction from './table-action';

interface ResponseData extends Pagination {
    data: UserType[];
}

interface UserProps extends PageProps {
    data: ResponseData;
}

function User() {
    // hooks
    const { data, auth } = usePage<UserProps>().props;

    // states
    const header: TableHeaderType[] = [
        { name: 'No', className: 'w-10 text-center' },
        { name: 'Nama', className: '' },
        { name: 'Email', className: '' },
        { name: 'Role', className: '' },
        { name: 'Avatar', className: 'text-center' },
        { name: '@', className: 'text-center' },
    ];
    const filterData = [
        { name: 'Semua', value: '' },
        { name: 'Admin', value: 'admin' },
        { name: 'Petugas', value: 'petugas' },
    ];
    const sortData = [
        { name: 'Bawaan', value: '' },
        { name: 'Terbaru', value: 'created_at' },
        { name: 'Nama', value: 'name' },
        { name: 'Email', value: 'email' },
    ];

    const canView = hasPermissions(auth.user.permissions!, ['view_user']);
    const canAdd = hasPermissions(auth.user.permissions!, ['insert_user']);
    const canEdit = hasPermissions(auth.user.permissions!, ['update_user']);
    const canDelete = hasPermissions(auth.user.permissions!, ['delete_user']);

    // events
    const handleDelete = (id: number) => {
        router.delete(route('user.destroy', id), {
            onSuccess: () => {
                //
            },
        });
    };

    return (
        <AuthLayout
            title="Manajemen User"
            subtitle="Halaman ini digunakan untuk manajemen user"
        >
            <Head title="Manajemen User" />
            <div className="flex flex-col gap-12">
                {canAdd && (
                    <Button asChild className="w-fit">
                        <Link
                            href={route('user.create')}
                            className="flex items-center justify-center gap-2"
                        >
                            <CirclePlus />
                            Tambah User
                        </Link>
                    </Button>
                )}

                <TableData
                    header={header}
                    filterData={filterData}
                    sortData={sortData}
                    link="user.index"
                    from={data.from}
                    to={data.to}
                    total={data.total}
                    links={data.links}
                    prev_page_url={data.prev_page_url}
                    next_page_url={data.next_page_url}
                >
                    {data?.data?.length > 0 ? (
                        data?.data.map((user, index: number) => (
                            <TableRow key={user.id}>
                                <TableCell className="text-center">
                                    {data.from! + index}
                                </TableCell>
                                <TableCell className="">{user.name}</TableCell>
                                <TableCell className="">{user.email}</TableCell>
                                <TableCell className="capitalize">
                                    {user.roles}
                                </TableCell>
                                <TableCell className="flex items-center justify-center">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src={`/storage/${user.avatar as string}`}
                                            alt={user.name}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            {getInitial(user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="text-center">
                                    <TableAction
                                        canView={canView}
                                        canEdit={canEdit}
                                        canDelete={canDelete}
                                        user={user}
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

export default User;
