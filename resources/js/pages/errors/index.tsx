import { Button } from '@/components/ui/button';
import GuestLayout from '@/layouts/guest-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface ErrorIndexProps {
    code: number;
    title: string;
    message: string;
}
function ErrorIndex({ code, title, message }: ErrorIndexProps) {
    return (
        <GuestLayout>
            <Head title={title} />

            <section className="bg-background">
                <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-center justify-center overflow-hidden">
                    <div className="mx-auto max-w-screen-sm space-y-4 text-center">
                        <h1 className="text-7xl font-extrabold tracking-tight text-primary lg:text-9xl">
                            {code}
                        </h1>

                        <p className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                            {title}
                        </p>

                        <p className="text-lg font-light text-muted-foreground">
                            {message}
                        </p>

                        <Button
                            className="flex w-full items-center gap-2"
                            asChild
                        >
                            <Link href={route('dashboard')}>
                                <ArrowLeft />
                                <span>Kembali</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}

export default ErrorIndex;
