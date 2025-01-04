import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

function Login({ status, canResetPassword }: LoginProps) {
    // hooks
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />

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
                                            <p className="my-3 text-balance text-muted-foreground">
                                                Silahkan login ke{' '}
                                                {import.meta.env.VITE_APP_NAME}{' '}
                                                akun.
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

                                        <div className="grid gap-2">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>

                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="••••••••"
                                                autoComplete="current-password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        'password',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Checkbox
                                                        id="remember"
                                                        name="remember"
                                                        onCheckedChange={(e) =>
                                                            setData(
                                                                'remember',
                                                                Boolean(e),
                                                            )
                                                        }
                                                        checked={data.remember}
                                                    />
                                                    <label
                                                        htmlFor="remember"
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        Ingat saya
                                                    </label>
                                                </div>

                                                {canResetPassword && (
                                                    <Link
                                                        href={route(
                                                            'password.request',
                                                        )}
                                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                                    >
                                                        Lupa password?
                                                    </Link>
                                                )}
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex w-full items-center justify-center gap-2"
                                        >
                                            {processing && (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            )}
                                            <span>Login</span>
                                        </Button>
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

export default Login;
