import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface TableLoadingProps {
    span: number;
}

function TableLoading({ span }: TableLoadingProps) {
    return (
        <TableRow>
            <TableCell colSpan={span} className={cn('text-center')}>
                Mohon ditunggu, sedang memuat data 🧐
            </TableCell>
        </TableRow>
    );
}

export default TableLoading;
