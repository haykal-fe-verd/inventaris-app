import { Head, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import React from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

function UpdatePassword() {
    // hooks
    const { data, setData, post, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.update'), {
            onFinish: () =>
                reset('password', 'password_confirmation', 'current_password'),
        });
    };

    return (
        <AuthLayout
            title="Update Password"
            subtitle="Halaman ini digunakan untuk mengganti password."
        >
            <Head title="Update Password" />
            <form onSubmit={onSubmit} className="w-full space-y-4 lg:w-1/2">
                <input
                    type="text"
                    name="username"
                    hidden
                    autoComplete="off"
                    className="hidden"
                />

                <div>
                    <Label htmlFor="current_password">Password Lama</Label>
                    <Input
                        type="password"
                        id="current_password"
                        name="current_password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                    />
                    <InputError message={errors.current_password} />
                </div>

                <div>
                    <Label htmlFor="password">Password Baru</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>

                <div>
                    <Label htmlFor="password_confirmation">
                        Konfirmasi Password Baru
                    </Label>
                    <Input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />
                    <InputError message={errors.password_confirmation} />
                </div>
                <Button
                    type="submit"
                    disabled={processing}
                    className="inline-flex w-full items-center justify-center gap-2"
                >
                    {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                    <span>Simpan</span>
                </Button>
            </form>
        </AuthLayout>
    );
}

export default UpdatePassword;
