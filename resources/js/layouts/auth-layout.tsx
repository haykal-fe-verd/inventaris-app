import { usePage } from '@inertiajs/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React from 'react';
import { toast } from 'sonner';

import { PageProps, User } from '@/types';

import animationSound from '@/assets/notification.wav';
import { AppSidebar } from '@/components/app-sidebar';
import ThemeDataProvider from '@/components/theme-data-proveider';
import Topbar from '@/components/topbar';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

interface Event {
    message: string;
    user: User;
}

function AuthLayout({
    children,
    title,
    subtitle,
}: React.PropsWithChildren<{ title?: string; subtitle?: string }>) {
    // hooks
    const { sessions, status, auth } = usePage<PageProps>().props;

    // mounted
    React.useEffect(() => {
        if (status) {
            toast(status);
        }

        if (sessions?.success) {
            toast.success('Berhasil', {
                description: sessions.success,
            });
        }

        if (sessions?.error) {
            toast.error('Oops', {
                description: sessions.error,
            });
        }
    }, [sessions, status]);

    // notifications
    React.useEffect(() => {
        const channel = window.Echo.channel(
            `action-notification-${auth.user.id}`,
        );
        channel.listen('.action-notification', (e: Event) => {
            const audio = new Audio(animationSound);
            audio.play();

            toast.info('Notifikasi', {
                description: e.message,
            });
        });

        return () => {
            channel.stopListening('.action-notification');
        };
    }, []);

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <ThemeDataProvider>
                <SidebarProvider>
                    <AppSidebar />
                    <main className="w-full space-y-4 p-4">
                        <Topbar />
                        <Card>
                            <CardHeader>
                                <CardTitle>{title}</CardTitle>
                                <CardDescription>{subtitle}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {children}
                                <Toaster
                                    position="top-right"
                                    expand={true}
                                    richColors
                                />
                            </CardContent>
                        </Card>
                    </main>
                </SidebarProvider>
            </ThemeDataProvider>
        </NextThemesProvider>
    );
}

export default AuthLayout;
