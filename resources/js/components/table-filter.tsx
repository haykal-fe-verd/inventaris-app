import { Filter } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TableFilterProps {
    className?: string;
    data: { name: string; value: string }[];
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
}
function TableFilter({
    className,
    data,
    filter,
    setFilter,
    setIsChanged,
}: TableFilterProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn('inline-flex gap-2', className)}
                asChild
            >
                <Button>
                    <Filter />
                    <span>Filter</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                <DropdownMenuRadioGroup
                    value={filter}
                    onValueChange={(e) => {
                        setIsChanged(true);
                        setFilter(e);
                    }}
                >
                    <ScrollArea
                        className={cn(data.length > 5 ? 'h-48' : 'h-full')}
                    >
                        {data.map((item) => (
                            <DropdownMenuRadioItem
                                key={item.value}
                                value={item.value}
                            >
                                {item.name}
                            </DropdownMenuRadioItem>
                        ))}
                    </ScrollArea>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default TableFilter;
