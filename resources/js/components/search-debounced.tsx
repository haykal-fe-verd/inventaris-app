import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import React from 'react';

interface SearchDebouncedProps {
    className?: string;
    delay?: number;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    getData: () => void;
    setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchDebounced({
    className,
    delay = 300,
    search,
    setSearch,
    getData,
    setIsChanged,
}: SearchDebouncedProps) {
    // states
    const [searchChanged, setSearchChanged] = React.useState(false);

    // mounted
    React.useEffect(() => {
        if (searchChanged) {
            const delaySearch = setTimeout(() => {
                getData();
            }, delay);

            return () => {
                clearTimeout(delaySearch);
            };
        }
        setSearchChanged(true);
    }, [delay, getData, search, searchChanged, setIsChanged, setSearchChanged]);

    return (
        <div
            className={cn(
                'relative w-full overflow-hidden rounded-md',
                className,
            )}
        >
            <Input
                id="search"
                name="search"
                type="search"
                placeholder="Cari..."
                className="pl-12"
                autoComplete="search"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setIsChanged(true);
                }}
            />
            <div className="absolute inset-y-0 left-0 flex items-center rounded-l-md border bg-primary px-2">
                <Search className="text-primary-foreground" />
            </div>
        </div>
    );
}

export default SearchDebounced;
