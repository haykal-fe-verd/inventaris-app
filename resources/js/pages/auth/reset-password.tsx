import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/layouts/guest-layout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

function ResetPassword({ token, email }: ResetPasswordProps) {
    // hooks
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <div className="flex flex-col gap-6">
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
                                            <p className="my-3 text-balance text-muted-foreground">
                                                Silahkan masukkan password baru
                                                untuk mengamankan akun anda
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
                                                disabled
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>

                                            <Input
                                                name="password"
                                                id="password"
                                                type="password"
                                                placeholder="••••••••"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        'password',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="password">
                                                Password Konfirmasi
                                            </Label>

                                            <Input
                                                name="password_confirmation"
                                                id="password_confirmation"
                                                type="password"
                                                placeholder="••••••••"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'password_confirmation',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />

                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
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
                                            <span>Reset Password</span>
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
        </GuestLayout>
    );
}

export default ResetPassword;
