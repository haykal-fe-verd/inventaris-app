import { Head, router } from '@inertiajs/react';
import { addMonths, format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon, PlayCircle, Printer } from 'lucide-react';
import React from 'react';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

import { cn, formatedDateSimple } from '@/lib/utils';
import { BarangMasuk, PageProps, TableHeaderType } from '@/types';

import TableLoading from '@/components/table-loading';
import TableNodata from '@/components/table-nodata';
import { Button, buttonVariants } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
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

interface LaporanBarangMasukProps extends PageProps {
    barangMasuk: BarangMasuk[];
}

function LaporanBarangMasuk({ barangMasuk }: LaporanBarangMasukProps) {
    // states
    const header: TableHeaderType[] = [
        { name: 'No', className: 'w-10 text-center' },
        { name: 'Kode Barang Masuk', className: '' },
        { name: 'Nama Barang', className: '' },
        { name: 'kategori', className: '' },
        { name: 'Supplier', className: '' },
        { name: 'Tanggal Masuk', className: '' },
        { name: 'Jumlah', className: '' },
    ];
    const today = new Date();
    const oneMonthLater = addMonths(today, 1);
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: today,
        to: oneMonthLater,
    });
    const [loading, setLoading] = React.useState<boolean>(false);

    // events
    const handleTampilkan = () => {
        if (!date || !date.from || !date.to) {
            toast('Harap pilih tanggal terlebih dahulu');
            return;
        }

        try {
            setLoading(true);
            router.get(
                route('laporan-barang-masuk.index'),
                {
                    from: format(date.from, 'yyyy-MM-dd'),
                    to: format(date.to, 'yyyy-MM-dd'),
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                },
            );
        } catch (error) {
            toast.error('Terjadi kesalahan saat mengambil data transaksi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Laporan Barang Masuk"
            subtitle="Halaman ini digunakan untuk manajemen laporan barang masuk."
        >
            <Head title="Laporan Barang Masuk" />

            <div className="space-y-5">
                <div className="flex items-center gap-5">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant="outline"
                                className={cn(
                                    'w-[400px] justify-start text-left font-normal',
                                    !date && 'text-muted-foreground',
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, 'd MMMM y', {
                                                locale: id,
                                            })}{' '}
                                            -{' '}
                                            {format(date.to, 'd MMMM y', {
                                                locale: id,
                                            })}
                                        </>
                                    ) : (
                                        format(date.from, 'd MMMM y', {
                                            locale: id,
                                        })
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>

                    <Button
                        type="button"
                        className="inline-flex items-center justify-center gap-2"
                        onClick={handleTampilkan}
                    >
                        <PlayCircle className="h-4 w-4" />
                        <span>Tampilkan</span>
                    </Button>
                </div>
                {barangMasuk && barangMasuk.length > 0 && (
                    <div className="space-y-5">
                        <Separator />

                        <a
                            href={route('laporan.barang-masuk.pdf', {
                                from: format(
                                    date?.from || new Date(),
                                    'yyyy-MM-dd',
                                ),
                                to: format(
                                    date?.to || new Date(),
                                    'yyyy-MM-dd',
                                ),
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={buttonVariants({
                                variant: 'secondary',
                                className:
                                    'inline-flex items-center justify-center gap-2',
                            })}
                        >
                            <Printer />
                            <span>Cetak PDF</span>
                        </a>

                        <div className="overflow-hidden rounded-md border">
                            <Table>
                                <TableHeader className="bg-muted">
                                    <TableRow>
                                        {header.map((item, index) => (
                                            <TableHead
                                                key={index}
                                                className={cn(item.className)}
                                            >
                                                {item.name}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableLoading span={header.length} />
                                    ) : barangMasuk.length <= 0 ? (
                                        <TableNodata span={header.length} />
                                    ) : (
                                        barangMasuk.map((item, index) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="text-center">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="">
                                                    {item.kode_barang_masuk}
                                                </TableCell>
                                                <TableCell className="capitalize">
                                                    {item.barang.nama}
                                                </TableCell>
                                                <TableCell className="capitalize">
                                                    {item.barang.kategori.nama}
                                                </TableCell>
                                                <TableCell className="">
                                                    {item.supplier.nama}
                                                </TableCell>
                                                <TableCell className="">
                                                    {formatedDateSimple(
                                                        item.tanggal_masuk,
                                                    )}
                                                </TableCell>
                                                <TableCell className="">
                                                    {item.jumlah}{' '}
                                                    <span className="font-semibold">
                                                        {item.barang.satuan}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}
            </div>
        </AuthLayout>
    );
}

export default LaporanBarangMasuk;
