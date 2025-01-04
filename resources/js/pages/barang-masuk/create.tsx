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
import { Textarea } from '@/components/ui/textarea';
import AuthLayout from '@/layouts/auth-layout';

interface BarangMasukProps extends PageProps {
    supplier: Supplier[];
    barang: Barang[] | null;
}

interface BarangInput {
    id: number;
    jumlah: number;
}

interface FormInput {
    kode_barang_masuk: string;
    id_supplier: string;
    tanggal_masuk: string;
    keterangan: string;
    barang: BarangInput[] | [];
}

function CreateBarangMasuk() {
    // hooks
    const { supplier, barang } = usePage<BarangMasukProps>().props;
    const { data, setData, post, processing, errors, reset } =
        useForm<FormInput>({
            kode_barang_masuk: '',
            id_supplier: '',
            tanggal_masuk: '',
            keterangan: '',
            barang: [],
        });

    // states
    const [open, setOpen] = React.useState<boolean>(false);
    const [barangData, setBarangData] = React.useState<BarangInput[] | []>([]);

    // events
    const onChangeSelect = (value: string) => {
        const filteredParams = pickBy({ id_supplier: value });
        router.get(route('barang-masuk.create'), filteredParams, {
            preserveState: true,
            replace: true,
        });
        setData('id_supplier', value);
    };

    const handleJumlahChange = (id: number, jumlah: number) => {
        const newBarang = [...barangData];

        const index = newBarang.findIndex((item) => item.id === id);

        if (index !== -1) {
            newBarang[index].jumlah = jumlah;
        } else {
            newBarang.push({ id, jumlah });
        }

        setBarangData(newBarang);
        setData('barang', newBarang);
    };

    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route('barang-masuk.store'), {
            preserveScroll: true,
            preserveState: true,
            replace: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthLayout
            title="Tambah Barang Masuk"
            subtitle="Halaman ini digunakan untuk tambah barang masuk."
        >
            <Head title="Tambah Barang Masuk" />

            <form onSubmit={onSubmit} className="w-full space-y-5">
                <div className="flex w-full flex-col gap-5 lg:flex-row">
                    <div className="w-full">
                        <Label htmlFor="kode_barang_masuk">Kode</Label>
                        <Input
                            id="kode_barang_masuk"
                            name="kode_barang_masuk"
                            type="text"
                            placeholder="BM###"
                            autoComplete="off"
                            value={data.kode_barang_masuk}
                            onChange={(e) =>
                                setData('kode_barang_masuk', e.target.value)
                            }
                        />
                        <InputError message={errors.kode_barang_masuk} />
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
                        <Label htmlFor="tanggal_masuk">Tanggal Masuk</Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-full pl-3 text-left font-normal',
                                        !data.tanggal_masuk &&
                                            'text-muted-foreground',
                                    )}
                                >
                                    {data.tanggal_masuk ? (
                                        format(
                                            new Date(data.tanggal_masuk),
                                            'PPP',
                                            { locale: id },
                                        )
                                    ) : (
                                        <span>Pilih Tanggal Masuk</span>
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
                                        data.tanggal_masuk
                                            ? new Date(data.tanggal_masuk)
                                            : undefined
                                    }
                                    onSelect={(date) => {
                                        if (date) {
                                            const formattedDate = format(
                                                date,
                                                'yyyy-MM-dd',
                                            );
                                            setData(
                                                'tanggal_masuk',
                                                formattedDate,
                                            );
                                            setOpen(false);
                                        }
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <InputError message={errors.tanggal_masuk} />
                    </div>
                </div>
                <div className="flex w-full flex-col gap-5">
                    <div>
                        <Label htmlFor="keterangan">Keterangan</Label>
                        <Textarea
                            id="keterangan"
                            name="keterangan"
                            placeholder="keterangan"
                            autoComplete="off"
                            value={data.keterangan}
                            onChange={(e) =>
                                setData('keterangan', e.target.value)
                            }
                        />
                        <InputError message={errors.keterangan} />
                    </div>
                </div>

                <Separator />

                {barang && barang.length > 0 && (
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
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {barang?.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="text-center">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>{item.kode}</TableCell>
                                            <TableCell>{item.nama}</TableCell>
                                            <TableCell>
                                                {formatCurrency(item.harga)}
                                            </TableCell>

                                            <TableCell>
                                                {item.stok}{' '}
                                                <span>{item.satuan}</span>
                                            </TableCell>
                                            <TableCell className="w-[300px]">
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    value={
                                                        barangData.find(
                                                            (b) =>
                                                                b.id ===
                                                                item.id,
                                                        )?.jumlah || 0
                                                    }
                                                    onChange={(e) =>
                                                        handleJumlahChange(
                                                            item.id,
                                                            parseInt(
                                                                e.target.value,
                                                                10,
                                                            ) || 0,
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <InputError message={errors.barang} />

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

export default CreateBarangMasuk;
