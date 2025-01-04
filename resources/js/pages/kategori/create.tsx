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
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

interface CreateKategoriProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
}
function CreateKategori({ setOpenModal, setIsAdd }: CreateKategoriProps) {
    // hooks
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
    });

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route('kategori.store'), {
            onSuccess: () => {
                setOpenModal(false);
                setIsAdd(false);
            },
        });
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Kategori</DialogTitle>
                <DialogDescription>Form tambah kategori.</DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} className="w-full space-y-5">
                <div className="flex w-full flex-col gap-5">
                    <div>
                        <Label htmlFor="nama">Nama Kategori</Label>
                        <Input
                            id="nama"
                            name="nama"
                            type="text"
                            placeholder="Kategori"
                            autoComplete="off"
                            value={data.nama}
                            onChange={(e) => setData('nama', e.target.value)}
                        />
                        <InputError message={errors.nama} />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={processing}
                    className="inline-flex w-fit items-center justify-center gap-2"
                >
                    {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                    <span>Tambah</span>
                </Button>
            </form>
        </DialogContent>
    );
}

export default CreateKategori;
