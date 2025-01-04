import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

import { Supplier } from '@/types';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TableActionProps {
    supplier: Supplier;
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
    setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setDetailData: React.Dispatch<React.SetStateAction<Supplier | undefined>>;
    setEditData: React.Dispatch<React.SetStateAction<Supplier | undefined>>;
    handleDelete: (id: number) => void;
}

function TableAction({
    supplier,
    canView,
    canEdit,
    canDelete,
    setIsDetail,
    setIsEdit,
    setDetailData,
    setEditData,
    handleDelete,
}: TableActionProps) {
    return (
        <AlertDialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-32" align="end">
                    {/* detail */}
                    {canView && (
                        <DialogTrigger
                            onClick={() => {
                                setDetailData(supplier);
                                setIsDetail(true);
                            }}
                            className="w-full"
                        >
                            <DropdownMenuItem className="items-center gap-3">
                                <Eye />
                                <span>Detail</span>
                            </DropdownMenuItem>
                        </DialogTrigger>
                    )}

                    {/* edit */}
                    {canEdit && (
                        <DialogTrigger
                            onClick={() => {
                                setEditData(supplier);
                                setIsEdit(true);
                            }}
                            className="w-full"
                        >
                            <DropdownMenuItem className="items-center gap-3">
                                <Pencil />
                                <span>Edit</span>
                            </DropdownMenuItem>
                        </DialogTrigger>
                    )}

                    {/* hapus */}
                    {canDelete && (
                        <AlertDialogTrigger className="w-full">
                            <DropdownMenuItem className="items-center gap-3">
                                <Trash2 />
                                <span>Hapus</span>
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Setelah dihapus, data tidak dapat dikembalikan!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Tidak</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => handleDelete(supplier.id)}
                    >
                        Lanjutkan
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default TableAction;
