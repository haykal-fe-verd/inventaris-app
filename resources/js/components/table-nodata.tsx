import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface TableNodataProps {
    span: number;
}

function TableNodata({ span }: TableNodataProps) {
    return (
        <TableRow>
            <TableCell colSpan={span} className={cn('p-4 text-center')}>
                Tidak ada data untuk diampilkan 🧐
            </TableCell>
        </TableRow>
    );
}

export default TableNodata;
