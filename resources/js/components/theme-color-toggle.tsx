import { useTheme } from 'next-themes';

import { useThemeContext } from '@/components/theme-data-proveider';
import { cn } from '@/lib/utils';
import { ThemeColors } from '@/types/theme-types';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';

function ThemeColorToggle() {
    // hooks
    const { themeColor, setThemeColor } = useThemeContext();
    const { theme } = useTheme();

    // states
    const availableThemeColors: {
        name: string;
        light: string;
        dark: string;
    }[] = [
        { name: 'Slate', light: 'bg-slate-900', dark: 'bg-slate-700' },
        { name: 'Zinc', light: 'bg-zinc-900', dark: 'bg-zinc-700' },
        { name: 'Rose', light: 'bg-rose-500', dark: 'bg-rose-500' },
        { name: 'Blue', light: 'bg-blue-500', dark: 'bg-blue-500' },
        { name: 'Green', light: 'bg-green-500', dark: 'bg-green-500' },
        { name: 'Orange', light: 'bg-orange-500', dark: 'bg-orange-500' },
        { name: 'Violet', light: 'bg-violet-500', dark: 'bg-violet-500' },
        { name: 'Yellow', light: 'bg-yellow-500', dark: 'bg-yellow-500' },
    ];

    const createSelectItems = () =>
        availableThemeColors.map(({ name, light, dark }) => (
            <DropdownMenuItem
                key={name}
                onClick={() => setThemeColor(name as ThemeColors)}
            >
                <div className="item-center flex space-x-3">
                    <div
                        className={cn(
                            'h-[20px] w-[20px] rounded-full border',
                            theme === 'light' ? light : dark,
                        )}
                    />
                    <div className="text-sm">{name}</div>
                </div>
            </DropdownMenuItem>
        ));

    const currentThemeColor = availableThemeColors.find(
        (item) => item.name === themeColor,
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-fit px-3">
                    <div
                        className={cn(
                            'h-4 w-4 rounded-full',
                            currentThemeColor
                                ? theme === 'light'
                                    ? currentThemeColor.light
                                    : currentThemeColor.dark
                                : 'bg-slate-900',
                        )}
                    />
                    <span className="hidden text-sm font-medium lg:block">
                        {themeColor}
                    </span>
                    <span className="sr-only">Toggle Theme Colors</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>{createSelectItems()}</DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ThemeColorToggle;
