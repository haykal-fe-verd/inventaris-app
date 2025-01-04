import { ArrowDownUp } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TableOrderProps {
    className?: string;
    data: { name: string; value: string }[];
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<string>>;
    setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

function TableOrder({
    className,
    data,
    sort,
    setSort,
    setIsChanged,
}: TableOrderProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn('inline-flex gap-2', className)}
                asChild
            >
                <Button>
                    <ArrowDownUp />
                    <span>Sort</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={(e) => {
                        setIsChanged(true);
                        setSort(e);
                    }}
                >
                    {data.map((item) => (
                        <DropdownMenuRadioItem
                            key={item.value}
                            value={item.value}
                        >
                            {item.name}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default TableOrder;
