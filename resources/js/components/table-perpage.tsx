import React from 'react';

import { cn } from '@/lib/utils';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface TablePerpageProps {
    className?: string;
    perPage: number;
    setPerPage: React.Dispatch<React.SetStateAction<number>>;
    setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

function TablePerpage({
    className,
    perPage,
    setPerPage,
    setIsChanged,
}: TablePerpageProps) {
    // events
    const handlePerPageChange = (e: string) => {
        setIsChanged(true);
        setPerPage(Number(e));
    };

    return (
        <Select
            name="perpage"
            onValueChange={handlePerPageChange}
            defaultValue={perPage.toString()}
        >
            <SelectTrigger
                className={cn(
                    'w-20 bg-primary text-primary-foreground',
                    className,
                )}
            >
                <SelectValue placeholder={perPage.toString()} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
            </SelectContent>
        </Select>
    );
}

export default TablePerpage;
