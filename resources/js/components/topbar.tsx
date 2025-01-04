import React from 'react';

import ThemeColorToggle from '@/components/theme-color-toggle';
import ThemeModeToggle from '@/components/theme-mode-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';

function Topbar() {
    // states
    const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    const currentDateFormatted = currentDate.toLocaleDateString(
        'id-ID',
        options,
    );

    // mounted
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <header className="flex h-12 w-full items-center rounded-md border shadow">
            <div className="flex w-full items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <ThemeModeToggle />
                    <ThemeColorToggle />
                </div>

                <div className="justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                    {currentDateFormatted}
                </div>
            </div>
        </header>
    );
}

export default Topbar;
