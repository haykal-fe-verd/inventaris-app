import { Head, router, useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { pickBy } from 'lodash';
import { CalendarIcon, Loader2 } from 'lucide-react';
import React from 'react';

import { cn, formatCurrency } from '@/lib/utils';
import { Barang, PageProps, Supplier } from '@/types';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AuthLayout from '@/layouts/auth-layout';

interface BarangKeluarProps extends PageProps {
    supplier: Supplier[];
    barang: Barang[] | null;
}

interface FormInput {
    kode_barang_keluar: string;
    id_supplier: string;
    tanggal_keluar: string;
    keterangan: string;
    id_barang: string;
    tujuan: string;
    jumlah: string;
}

function CreateBarangKeluar() {
    // hooks
    const { supplier, barang } = usePage<BarangKeluarProps>().props;
    const { data, setData, post, processing, errors, reset } =
        useForm<FormInput>({
            kode_barang_keluar: '',
            id_supplier: '',
            tanggal_keluar: '',
            keterangan: '',
            id_barang: '',
            tujuan: '',
            jumlah: '',
        });

    // states
    const [open, setOpen] = React.useState<boolean>(false);
    const [selectedBarang, setSelectedBarang] = React.useState<Barang | null>();

    // events
    const onChangeSelect = (value: string) => {
        const filteredParams = pickBy({ id_supplier: value });
        router.get(route('barang-keluar.create'), filteredParams, {
            preserveState: true,
            replace: true,
        });
        setData('id_supplier', value);
        setSelectedBarang(null);
        reset('id_barang', 'tujuan', 'jumlah', 'tujuan');
    };

    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route('barang-keluar.store'), {
            preserveScroll: true,
            preserveState: true,
            replace: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthLayout
            title="Tambah Barang Keluar"
            subtitle="Halaman ini digunakan untuk tambah barang keluar."
        >
            <Head title="Tambah Barang Keluar" />

            <form onSubmit={onSubmit} className="w-full space-y-5">
                <div className="flex w-full flex-col gap-5 lg:flex-row">
                    <div className="w-full">
                        <Label htmlFor="kode_barang_keluar">
                            Kode Barang Keluar
                        </Label>
                        <Input
                            id="kode_barang_keluar"
                            name="kode_barang_keluar"
                            type="text"
                            placeholder="BK###"
                            autoComplete="off"
                            value={data.kode_barang_keluar}
                            onChange={(e) =>
                                setData('kode_barang_keluar', e.target.value)
                            }
                        />
                        <InputError message={errors.kode_barang_keluar} />
                    </div>

                    <div className="w-full">
                        <Label htmlFor="id_supplier">Supplier</Label>
                        <Select
                            onValueChange={onChangeSelect}
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

                    <div className="w-full">
                        <Label htmlFor="tanggal_keluar">Tanggal Keluar</Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-full pl-3 text-left font-normal',
                                        !data.tanggal_keluar &&
                                            'text-muted-foreground',
                                    )}
                                >
                                    {data.tanggal_keluar ? (
                                        format(
                                            new Date(data.tanggal_keluar),
                                            'PPP',
                                            { locale: id },
                                        )
                                    ) : (
                                        <span>Pilih Tanggal Keluar</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={
                                        data.tanggal_keluar
                                            ? new Date(data.tanggal_keluar)
                                            : undefined
                                    }
                                    onSelect={(date) => {
                                        if (date) {
                                            const formattedDate = format(
                                                date,
                                                'yyyy-MM-dd',
                                            );
                                            setData(
                                                'tanggal_keluar',
                                                formattedDate,
                                            );
                                            setOpen(false);
                                        }
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <InputError message={errors.tanggal_keluar} />
                    </div>
                </div>

                <div className="flex w-full flex-col gap-5">
                    <div className="w-full">
                        <Label htmlFor="id_barang">Pilih Nama Barang</Label>
                        <Select
                            onValueChange={(e) => {
                                setData('id_barang', e);
                                if (barang) {
                                    const selectBarang = barang.find(
                                        (item) => item.id.toString() === e,
                                    );
                                    setSelectedBarang(selectBarang);
                                }
                            }}
                            defaultValue={data.id_barang}
                            disabled={!data.id_supplier}
                        >
                            <SelectTrigger
                                id="id_barang"
                                name="id_barang"
                                className="w-full"
                            >
                                <SelectValue placeholder="Pilih Nama Barang" />
                            </SelectTrigger>
                            <SelectContent>
                                {barang &&
                                    data.id_supplier &&
                                    barang.map((item) => (
                                        <SelectItem
                                            key={item.id}
                                            value={item.id.toString()}
                                            className="capitalize"
                                        >
                                            {item.nama}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>

                        <InputError message={errors.id_barang} />
                    </div>
                </div>

                <Separator />

                {selectedBarang && (
                    <>
                        <div className="overflow-hidden rounded-md border">
                            <Table>
                                <TableHeader className="bg-muted">
                                    <TableRow>
                                        <TableHead className="w-10 text-center">
                                            No
                                        </TableHead>
                                        <TableHead className="">
                                            Kode Barang
                                        </TableHead>
                                        <TableHead className="">
                                            Nama Barang
                                        </TableHead>
                                        <TableHead className="">
                                            Harga
                                        </TableHead>
                                        <TableHead className="">Stok</TableHead>
                                        <TableHead className="">
                                            Jumlah
                                        </TableHead>
                                        <TableHead className="">
                                            Tujuan
                                        </TableHead>
                                        <TableHead className="">
                                            Keterangan
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow key={selectedBarang.id}>
                                        <TableCell className="text-center">
                                            1
                                        </TableCell>
                                        <TableCell>
                                            {selectedBarang.kode}
                                        </TableCell>
                                        <TableCell>
                                            {selectedBarang.nama}
                                        </TableCell>
                                        <TableCell>
                                            {formatCurrency(
                                                selectedBarang.harga,
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {selectedBarang.stok}{' '}
                                            <span>{selectedBarang.satuan}</span>
                                        </TableCell>
                                        <TableCell className="">
                                            <Input
                                                type="number"
                                                min={0}
                                                value={data.jumlah}
                                                onChange={(e) => {
                                                    setData(
                                                        'jumlah',
                                                        e.target.value,
                                                    );
                                                }}
                                            />
                                            <InputError
                                                message={errors.jumlah}
                                            />
                                        </TableCell>
                                        <TableCell className="">
                                            <Input
                                                type="text"
                                                value={data.tujuan}
                                                onChange={(e) => {
                                                    setData(
                                                        'tujuan',
                                                        e.target.value,
                                                    );
                                                }}
                                            />
                                            <InputError
                                                message={errors.tujuan}
                                            />
                                        </TableCell>
                                        <TableCell className="">
                                            <Input
                                                type="text"
                                                value={data.keterangan}
                                                onChange={(e) => {
                                                    setData(
                                                        'keterangan',
                                                        e.target.value,
                                                    );
                                                }}
                                            />
                                            <InputError
                                                message={errors.keterangan}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <InputError message={errors.id_barang} />

                        <Separator />
                    </>
                )}

                <Button
                    type="submit"
                    disabled={processing}
                    className="inline-flex w-fit items-center justify-center gap-2"
                >
                    {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                    <span>Tambah</span>
                </Button>
            </form>
        </AuthLayout>
    );
}

export default CreateBarangKeluar;
