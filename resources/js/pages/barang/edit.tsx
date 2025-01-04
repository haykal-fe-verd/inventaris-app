import { Head, useForm, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import React from 'react';

import { Barang, Kategori, PageProps, Supplier } from '@/types';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AuthLayout from '@/layouts/auth-layout';

interface EditBarangProps extends PageProps {
    barang: Barang;
    kategori: Kategori[];
    supplier: Supplier[];
}

function EditBarang() {
    // hooks
    const { kategori, supplier, barang } = usePage<EditBarangProps>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        kode: barang.kode,
        nama: barang.nama,
        stok: barang.stok,
        harga: barang.harga,
        satuan: barang.satuan,
        deskripsi: barang.deskripsi,
        gambar: '' as File | string,
        id_kategori: barang.id_kategori.toString(),
        id_supplier: barang.id_supplier.toString(),
    });

    // states
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route('barang.update', barang.id), {
            onFinish: () => reset(),
        });
    };

    const onChangeFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('gambar', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    };

    return (
        <AuthLayout
            title="Edit Barang"
            subtitle="Halaman ini digunakan untuk edit barang."
        >
            <Head title="Edit barang" />

            <form onSubmit={onSubmit} className="w-full space-y-5">
                <div className="flex w-full flex-col justify-between gap-5 lg:flex-row">
                    <div className="flex w-full flex-col gap-5">
                        <div>
                            <Label htmlFor="kode">Kode Barang</Label>
                            <Input
                                id="kode"
                                name="kode"
                                type="text"
                                placeholder="Kode"
                                autoComplete="off"
                                value={data.kode}
                                onChange={(e) =>
                                    setData('kode', e.target.value)
                                }
                            />
                            <InputError message={errors.kode} />
                        </div>

                        <div>
                            <Label htmlFor="nama">Nama Barang</Label>
                            <Input
                                id="nama"
                                name="nama"
                                type="text"
                                placeholder="Barang"
                                autoComplete="off"
                                value={data.nama}
                                onChange={(e) =>
                                    setData('nama', e.target.value)
                                }
                            />
                            <InputError message={errors.nama} />
                        </div>

                        <div>
                            <Label htmlFor="stok">Stok Barang</Label>
                            <Input
                                id="stok"
                                name="stok"
                                type="number"
                                min={0}
                                placeholder="stok"
                                autoComplete="off"
                                value={data.stok}
                                onChange={(e) =>
                                    setData('stok', parseInt(e.target.value))
                                }
                            />
                            <InputError message={errors.stok} />
                        </div>

                        <div>
                            <Label htmlFor="harga">Harga Barang</Label>
                            <div className="relative">
                                <Input
                                    id="harga"
                                    name="harga"
                                    type="number"
                                    min={0}
                                    placeholder="harga"
                                    autoComplete="off"
                                    className="pl-14"
                                    value={data.harga}
                                    onChange={(e) =>
                                        setData(
                                            'harga',
                                            parseInt(e.target.value),
                                        )
                                    }
                                />
                                <span className="absolute inset-y-0 left-0 flex items-center rounded-l-md border bg-primary px-2 text-primary-foreground">
                                    Rp.
                                </span>
                            </div>
                            <InputError message={errors.harga} />
                        </div>

                        <div>
                            <Label htmlFor="satuan">Satuan</Label>
                            <Input
                                id="satuan"
                                name="satuan"
                                type="text"
                                placeholder="Satuan"
                                autoComplete="off"
                                value={data.satuan}
                                onChange={(e) =>
                                    setData('satuan', e.target.value)
                                }
                            />
                            <InputError message={errors.satuan} />
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-5">
                        <div>
                            <Label htmlFor="id_kategori">Kategori</Label>
                            <Select
                                onValueChange={(e) => {
                                    setData('id_kategori', e);
                                }}
                                defaultValue={data.id_kategori}
                            >
                                <SelectTrigger
                                    id="id_kategori"
                                    name="id_kategori"
                                    className="w-full"
                                >
                                    <SelectValue placeholder="Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    {kategori.map((item) => (
                                        <SelectItem
                                            key={item.id}
                                            value={item.id.toString()}
                                        >
                                            {item.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <InputError message={errors.id_kategori} />
                        </div>

                        <div>
                            <Label htmlFor="id_supplier">Supplier</Label>
                            <Select
                                onValueChange={(e) => {
                                    setData('id_supplier', e);
                                }}
                                defaultValue={data.id_supplier}
                            >
                                <SelectTrigger
                                    id="id_supplier"
                                    name="id_supplier"
                                    className="w-full"
                                >
                                    <SelectValue placeholder="Supplier" />
                                </SelectTrigger>
                                <SelectContent>
                                    {supplier.map((item) => (
                                        <SelectItem
                                            key={item.id}
                                            value={item.id.toString()}
                                        >
                                            {item.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <InputError message={errors.id_supplier} />
                        </div>

                        <div>
                            <Label htmlFor="gambar">Gambar</Label>
                            <Input
                                id="gambar"
                                name="gambar"
                                type="file"
                                placeholder="gambar"
                                autoComplete="off"
                                accept="image/*"
                                onChange={onChangeFoto}
                            />
                            <InputError message={errors.gambar} />
                        </div>

                        {previewUrl && (
                            <img
                                id="photoPreview"
                                src={previewUrl}
                                className="h-[250px] w-full object-cover"
                            />
                        )}

                        {barang?.gambar && !previewUrl && (
                            <img
                                id="photoPreview"
                                src={`/storage/${barang?.gambar}`}
                                className="h-[250px] w-full object-cover"
                            />
                        )}

                        <div>
                            <Label htmlFor="deskripsi">Deskripsi</Label>
                            <Textarea
                                id="deskripsi"
                                name="deskripsi"
                                placeholder="Deskripsi"
                                autoComplete="off"
                                value={data.deskripsi}
                                onChange={(e) =>
                                    setData('deskripsi', e.target.value)
                                }
                            />
                            <InputError message={errors.deskripsi} />
                        </div>
                    </div>
                </div>

                <Separator />

                <Button
                    type="submit"
                    disabled={processing}
                    className="inline-flex w-fit items-center justify-center gap-2"
                >
                    {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                    <span>Edit</span>
                </Button>
            </form>
        </AuthLayout>
    );
}

export default EditBarang;
