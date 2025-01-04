import { Head, useForm, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

import { groupedPermissions, transformPermission } from '@/lib/utils';
import { PageProps, Permission, Roles } from '@/types';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AuthLayout from '@/layouts/auth-layout';

interface CreateUserProps extends PageProps {
    roles: Roles[];
    permissions: Permission[];
}
function CreateUser() {
    // hooks
    const { roles, permissions } = usePage<CreateUserProps>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: '',
        permissions: [''] as string[],
    });

    const groupedPermissionsResult = groupedPermissions(permissions);
    const getPermissionErrors = () => {
        return (
            Object.keys(errors)
                .filter((key) => key.startsWith('permissions'))
                // @ts-ignore
                .map((key) => errors[key])
        );
    };

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route('user.store'), {
            onFinish: () => reset(),
        });
    };

    return (
        <AuthLayout
            title="Tambah User"
            subtitle="Halaman ini digunakan untuk tambah user."
        >
            <Head title="Tambah User" />

            <form onSubmit={onSubmit} className="w-full space-y-5">
                <div className="flex w-full flex-col justify-between gap-5 lg:flex-row">
                    <div className="flex w-full flex-col gap-5">
                        <div>
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Jhon Doe"
                                autoComplete="name"
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
                                id="email"
                                name="email"
                                type="email"
                                placeholder="email@example.com"
                                autoComplete="username"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div>
                            <Label htmlFor="password_confirmation">
                                Konfirmasi Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                            />
                            <InputError
                                message={errors.password_confirmation}
                            />
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-5">
                        <div>
                            <Label htmlFor="role">Role</Label>
                            <Select
                                onValueChange={(e) => setData('roles', e)}
                                defaultValue={data.roles}
                            >
                                <SelectTrigger
                                    id="roles"
                                    name="roles"
                                    className="w-full capitalize"
                                >
                                    <SelectValue
                                        placeholder="Pilih Role"
                                        className="capitalize"
                                    />
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
                            <InputError message={errors.roles} />
                        </div>

                        <div>
                            <Label htmlFor="permission">Hak Akses</Label>
                            <div className="mt-5 space-y-5">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="select-all"
                                        name="select-all"
                                        checked={
                                            data.permissions.length ===
                                            permissions.length
                                        }
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setData(
                                                    'permissions',
                                                    permissions.map(
                                                        (permission) =>
                                                            permission.name,
                                                    ),
                                                );
                                            } else {
                                                setData('permissions', []);
                                            }
                                        }}
                                    />
                                    <Label
                                        htmlFor="select-all"
                                        className="text-sm font-semibold capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Pilih Semua
                                    </Label>
                                </div>

                                {getPermissionErrors().length > 0 && (
                                    <InputError message="Pilih minimal satu hak akses" />
                                )}

                                {Object.entries(groupedPermissionsResult).map(
                                    ([group, permissions]) => (
                                        <div
                                            key={group}
                                            className="mt-5 flex w-full flex-col"
                                        >
                                            <h3 className="text-sm font-semibold capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {group}
                                            </h3>
                                            <div className="mt-2 grid w-full gap-5 sm:grid-cols-1 lg:grid-cols-4">
                                                {permissions.map(
                                                    (permission) => (
                                                        <div
                                                            key={permission.id}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Checkbox
                                                                id={`permission-${permission.id}`}
                                                                name={`permission-${permission.id}`}
                                                                checked={data.permissions.includes(
                                                                    permission.name,
                                                                )}
                                                                onCheckedChange={(
                                                                    e: boolean,
                                                                ) => {
                                                                    const checked =
                                                                        e;
                                                                    setData(
                                                                        'permissions',
                                                                        checked
                                                                            ? [
                                                                                  ...data.permissions,
                                                                                  permission.name,
                                                                              ]
                                                                            : data.permissions.filter(
                                                                                  (
                                                                                      perm,
                                                                                  ) =>
                                                                                      perm !==
                                                                                      permission.name,
                                                                              ),
                                                                    );
                                                                }}
                                                            />
                                                            <Label
                                                                htmlFor={`permission-${permission.id}`}
                                                                className="text-xs capitalize"
                                                            >
                                                                {transformPermission(
                                                                    permission.name,
                                                                )}
                                                            </Label>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Separator />

                <Button
                    type="submit"
                    disabled={processing}
                    className="inline-flex w-full items-center justify-center gap-2"
                >
                    {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                    <span>Tambah</span>
                </Button>
            </form>
        </AuthLayout>
    );
}

export default CreateUser;
