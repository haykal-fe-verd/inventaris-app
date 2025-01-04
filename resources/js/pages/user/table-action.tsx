import { Link } from '@inertiajs/react';
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

import { User } from '@/types';

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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TableActionProps {
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
    user: User;
    handleDelete: (id: number) => void;
}

function TableAction({
    canView,
    canEdit,
    canDelete,
    user,
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
                        <DropdownMenuItem
                            className="items-center gap-3"
                            asChild
                        >
                            <Link href={route('user.show', user.id)}>
                                <Eye />
                                <span>Detail</span>
                            </Link>
                        </DropdownMenuItem>
                    )}

                    {/* edit */}
                    {canEdit && (
                        <DropdownMenuItem
                            className="items-center gap-3"
                            asChild
                        >
                            <Link href={route('user.edit', user.id)}>
                                <Pencil />
                                <span>Edit</span>
                            </Link>
                        </DropdownMenuItem>
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
                    <AlertDialogAction onClick={() => handleDelete(user.id)}>
                        Lanjutkan
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default TableAction;
