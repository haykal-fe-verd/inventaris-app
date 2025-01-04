import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import React from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ForgotPasswordProps {
    status?: string;
}

function ForgotPassword({ status }: ForgotPasswordProps) {
    // hooks
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />

            <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <div className="flex flex-col gap-6">
                        {status && (
                            <div className="w-full text-center text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}
                        <Card className="overflow-hidden">
                            <CardContent className="grid p-0 md:grid-cols-2">
                                <form
                                    onSubmit={onSubmit}
                                    className="p-6 md:p-8"
                                >
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col items-center text-center">
                                            <h1 className="text-2xl font-bold">
                                                Selamat datang
                                            </h1>
                                            <p className="my-3 text-balance text-justify text-sm text-muted-foreground">
                                                Lupa kata sandi? Tidak masalah.
                                                Cukup beri tahu kami alamat
                                                email Anda dan kami akan
                                                mengirimkan tautan untuk
                                                menyetel ulang kata sandi
                                                melalui email yang akan
                                                memungkinkan Anda memilih kata
                                                sandi baru.
                                            </p>
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="email@example.com"
                                                value={data.email}
                                                autoComplete="username"
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex w-full items-center justify-center gap-2"
                                        >
                                            {processing && (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            )}
                                            <span>Kirim Email Reset Link </span>
                                        </Button>

                                        <Link
                                            href={route('login')}
                                            className="text-center text-sm"
                                        >
                                            Kembali ke halaman login
                                        </Link>
                                    </div>
                                </form>
                                <div className="relative hidden bg-muted md:block">
                                    <img
                                        src="/placeholder.svg"
                                        alt="Image"
                                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                            Copyright &copy; {new Date().getFullYear()}{' '}
                            {import.meta.env.VITE_APP_NAME} <br /> v{' '}
                            {import.meta.env.VITE_APP_VERSION}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
