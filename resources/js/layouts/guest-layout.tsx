import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React from 'react';

import ThemeDataProvider from '@/components/theme-data-proveider';
import { Toaster } from '@/components/ui/sonner';

function GuestLayout({ children }: React.PropsWithChildren) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <ThemeDataProvider>
                <main>
                    {children}
                    <Toaster position="top-right" expand={true} richColors />
                </main>
            </ThemeDataProvider>
        </NextThemesProvider>
    );
}

export default GuestLayout;
