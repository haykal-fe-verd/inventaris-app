import { formatedDate } from '@/lib/utils';
import { Kategori } from '@/types';

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

interface DetailKategoriProps {
    kategori: Kategori;
}

function DetailKategori({ kategori }: DetailKategoriProps) {
    // states
    const createdAt = formatedDate(kategori.created_at!);
    const updatedAt = formatedDate(kategori.updated_at!);

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Kategori</DialogTitle>
                <DialogDescription>
                    Menampilkan detail kategori.
                </DialogDescription>
            </DialogHeader>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Nama</TableCell>
                            <TableCell>: {kategori.nama}</TableCell>
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

export default DetailKategori;
