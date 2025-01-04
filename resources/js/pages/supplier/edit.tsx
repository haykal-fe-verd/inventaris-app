import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

import { Supplier } from '@/types';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface EditSupplierProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    editData: Supplier;
}

function EditSupplier({
    setOpenModal,
    setIsEdit,
    editData,
}: EditSupplierProps) {
    // hooks
    const { data, setData, put, processing, errors } = useForm({
        nama: editData.nama,
        email: editData.email,
        no_hp: editData.no_hp,
        alamat: editData.alamat,
    });

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        put(route('supplier.update', editData.id), {
            onSuccess: () => {
                setOpenModal(false);
                setIsEdit(false);
            },
        });
    };

    return (
        <DialogContent className="max-h-screen overflow-y-scroll">
            <DialogHeader>
                <DialogTitle>Supplier</DialogTitle>
                <DialogDescription>Form edit supplier.</DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} className="w-full space-y-5">
                <div className="flex w-full flex-col gap-5">
                    <div>
                        <Label htmlFor="nama">Nama Supplier</Label>
                        <Input
                            id="nama"
                            name="nama"
                            type="text"
                            placeholder="Supplier"
                            autoComplete="username"
                            value={data.nama}
                            onChange={(e) => setData('nama', e.target.value)}
                        />
                        <InputError message={errors.nama} />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="email@example.com"
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div>
                        <Label htmlFor="no_hp">No HP</Label>
                        <Input
                            id="no_hp"
                            name="no_hp"
                            type="text"
                            placeholder="xxxxxxxxxx"
                            autoComplete="off"
                            value={data.no_hp}
                            onChange={(e) => setData('no_hp', e.target.value)}
                        />
                        <InputError message={errors.no_hp} />
                    </div>
                    <div>
                        <Label htmlFor="alamat">Alamat</Label>
                        <Textarea
                            id="alamat"
                            name="alamat"
                            placeholder="Jln. Example"
                            autoComplete="off"
                            value={data.alamat}
                            onChange={(e) => setData('alamat', e.target.value)}
                        />
                        <InputError message={errors.alamat} />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={processing}
                    className="inline-flex w-fit items-center justify-center gap-2"
                >
                    {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                    <span>Edit</span>
                </Button>
            </form>
        </DialogContent>
    );
}

export default EditSupplier;
