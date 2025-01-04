import { Head, useForm, usePage } from '@inertiajs/react';
import { CameraIcon, Loader2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { getInitial, transformPermission } from '@/lib/utils';
import { PageProps, Permission, Roles } from '@/types';

import InputError from '@/components/input-error';
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

interface ProfileProps extends PageProps {
    roles: Roles[];
    permissions: Permission[];
}

function Profile() {
    // hooks
    const { auth, roles, permissions, status } = usePage<ProfileProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: auth?.user?.name,
        email: auth?.user?.email,
        avatar: auth?.user?.avatar,
    });

    // states
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

    // events
    const browseImage = () => {
        inputRef.current?.click();
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setData('avatar', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl('');
        }
    };

    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route('profile.update'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset('avatar');
            },
        });
    };

    // mounted
    React.useEffect(() => {
        if (status) {
            toast(status);
        }
    }, [status]);

    return (
        <AuthLayout
            title="Profile"
            subtitle="Halaman ini digunakan untuk mengganti profile."
        >
            <Head title="Profile" />

            <form onSubmit={onSubmit}>
                <div className="flex w-full flex-col gap-5 lg:flex-row">
                    <div className="flex w-full flex-col gap-5">
                        <div className="relative mb-10 h-[200px] w-full rounded-md bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 shadow-2xl lg:h-[300px]">
                            <input
                                id="avatar"
                                name="avatar"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={inputRef}
                                onChange={onChange}
                            />
                            <Avatar className="absolute -bottom-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full border-2 object-cover">
                                {previewUrl ? (
                                    <AvatarImage
                                        id="photoPreview"
                                        src={previewUrl}
                                    />
                                ) : (
                                    <AvatarImage
                                        id="photoPreview"
                                        src={`/storage/${auth?.user?.avatar as string}`}
                                    />
                                )}
                                <AvatarFallback>
                                    {getInitial(auth?.user?.name)}
                                </AvatarFallback>
                            </Avatar>

                            <button
                                type="button"
                                onClick={browseImage}
                                className="absolute -bottom-12 left-1/2 flex h-32 w-32 -translate-x-1/2 items-center justify-center rounded-full bg-black text-white opacity-0 transition-opacity duration-300 hover:opacity-80"
                            >
                                <CameraIcon className="h-5 w-5" />
                            </button>
                            <div className="absolute -bottom-5 text-center">
                                <InputError message={errors.avatar} />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Jhon Doe"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="email@example.com"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div>
                            <Label htmlFor="role">Role</Label>
                            <Select
                                defaultValue={auth?.user?.roles[0]}
                                disabled
                            >
                                <SelectTrigger className="capitalize">
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem
                                            key={role.id}
                                            value={role.name}
                                            className="capitalize"
                                        >
                                            {role.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <InputError message={errors.email} />
                        </div>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="inline-flex w-full items-center justify-center gap-2"
                        >
                            {processing && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            )}
                            <span>Simpan</span>
                        </Button>
                    </div>

                    <div className="w-full">
                        <Label>Hak Akses</Label>
                        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                            {permissions.map((permission) => (
                                <Badge
                                    key={permission.id}
                                    className="rounded-full capitalize"
                                >
                                    {transformPermission(permission.name)}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
}

export default Profile;
