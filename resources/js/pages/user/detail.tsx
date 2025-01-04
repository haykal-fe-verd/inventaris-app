import { Head, Link } from '@inertiajs/react';
import { CircleChevronLeft } from 'lucide-react';

import { getInitial } from '@/lib/utils';
import { PageProps, User } from '@/types';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';

interface DetailUserProps extends PageProps {
    data: User;
}

function DetailUser({ data }: DetailUserProps) {
    return (
        <AuthLayout
            title="Detail User"
            subtitle="Halaman ini digunakan untuk melihat detail user."
        >
            <Head title="Detail User" />

            <Button asChild className="mb-5">
                <Link href={route('user.index')}>
                    <CircleChevronLeft />
                    <span>Kembali</span>
                </Link>
            </Button>
            <div className="flex w-full flex-col gap-5 lg:flex-row">
                <div className="flex w-full flex-col gap-5">
                    <div className="relative mb-10 h-[200px] w-full rounded-md bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 shadow-2xl lg:h-[300px]">
                        <Avatar className="absolute -bottom-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full border-2 object-cover">
                            <AvatarImage
                                id="photoPreview"
                                src={`/storage/${data?.avatar as string}`}
                            />
                            <AvatarFallback>
                                {getInitial(data?.name)}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    <div>
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Jhon Doe"
                            value={data.name}
                            readOnly
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email@example.com"
                            value={data.email}
                            readOnly
                        />
                    </div>

                    <div>
                        <Label htmlFor="role">Role</Label>
                        <Select defaultValue={data?.roles[0]} disabled>
                            <SelectTrigger className="capitalize">
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                                {data.roles.map((role) => (
                                    <SelectItem
                                        key={role}
                                        value={role}
                                        className="capitalize"
                                    >
                                        {role}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="w-full">
                    <Label>Hak Akses</Label>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                        {data?.permissions!.map((permission) => (
                            <Badge
                                key={permission}
                                className="rounded-full capitalize"
                            >
                                {permission}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default DetailUser;
