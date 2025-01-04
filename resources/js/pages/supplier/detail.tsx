import { formatedDate } from '@/lib/utils';
import { Supplier } from '@/types';

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

interface DetailSupplierProps {
    supplier: Supplier;
}

function DetailSupplier({ supplier }: DetailSupplierProps) {
    // states
    const createdAt = formatedDate(supplier.created_at!);
    const updatedAt = formatedDate(supplier.updated_at!);

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Supplier</DialogTitle>
                <DialogDescription>
                    Menampilkan detail supplier.
                </DialogDescription>
            </DialogHeader>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Nama</TableCell>
                            <TableCell>: {supplier.nama}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>: {supplier.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>No HP</TableCell>
                            <TableCell>: {supplier.no_hp}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Alamat</TableCell>
                            <TableCell>: {supplier.alamat}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Dibuat</TableCell>
                            <TableCell>: {createdAt}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Diedit</TableCell>
                            <TableCell>: {updatedAt}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </DialogContent>
    );
}

export default DetailSupplier;
