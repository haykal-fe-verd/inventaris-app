import { Head } from '@inertiajs/react';
import React from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Label,
    Pie,
    PieChart,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
    XAxis,
} from 'recharts';

import { PageProps } from '@/types';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import AuthLayout from '@/layouts/auth-layout';

interface ChartData1 {
    mounth: string;
    total_in: number;
    total_out: number;
}
interface ChartData2 {
    name: string;
    total: number;
    fill: string;
}

interface ChartData3 {
    admin: number;
    petugas: number;
}
interface DashboardProps extends PageProps {
    chartData1: ChartData1[];
    chartData2: ChartData2[];
    chartData3: ChartData3[];
}
export default function Dashboard({
    chartData1,
    chartData2,
    chartData3,
}: DashboardProps) {
    return (
        <AuthLayout
            title="Dashboard"
            subtitle={`Selamat datang di ${import.meta.env.VITE_APP_NAME}`}
        >
            <Head title="Dashboard" />

            <div className="grid w-full grid-cols-4 grid-rows-2 gap-4">
                <Chart1 data={chartData1} />
                <Chart2 data={chartData2} />
                <Chart3 data={chartData3} />
            </div>
        </AuthLayout>
    );
}

const Chart1 = ({ data }: { data: ChartData1[] }) => {
    const chartConfig = {
        total_in: {
            label: 'Barang Masuk',
            color: 'hsl(var(--chart-1))',
        },
        total_out: {
            label: 'Barang Keluar',
            color: 'hsl(var(--chart-2))',
        },
    } satisfies ChartConfig;

    return (
        <Card className="col-span-4 row-span-3 lg:col-span-3 lg:row-span-2">
            <CardHeader>
                <CardTitle>Barang Masuk dan Barang Keluar</CardTitle>
                <CardDescription>
                    Menampilkan total barang masuk & keluar dalam setahun.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) =>
                                new Date(0, value - 1).toLocaleString('id', {
                                    month: 'short',
                                })
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            dataKey="total_in"
                            type="natural"
                            fill="var(--color-total_in)"
                            fillOpacity={0.4}
                            stroke="var(--color-total_in)"
                            stackId="a"
                        />
                        <Area
                            dataKey="total_out"
                            type="natural"
                            fill="var(--color-total_out)"
                            fillOpacity={0.4}
                            stroke="var(--color-total_out)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Januari - Desember {new Date().getFullYear()}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

const Chart2 = ({ data }: { data: ChartData2[] }) => {
    const chartConfig = {
        kategori: {
            label: 'Kategori',
        },
        supplier: {
            label: 'Supplier',
            color: 'hsl(var(--chart-1))',
        },
        barang: {
            label: 'Barang',
            color: 'hsl(var(--chart-2))',
        },
        barang_masuk: {
            label: 'Barang Masuk',
            color: 'hsl(var(--chart-3))',
        },
        barang_keluar: {
            label: 'Barang Keluar',
            color: 'hsl(var(--chart-4))',
        },
    };

    const totalSemuanya = React.useMemo(() => {
        return data.reduce((acc, curr) => acc + curr.total, 0);
    }, []);

    return (
        <Card className="col-span-4 row-span-3 lg:col-span-1 lg:row-span-1">
            <CardHeader className="pb-0">
                <CardTitle>
                    Total Kategori, Supplier, Barang, Barang Masuk dan Barang
                    Keluar
                </CardTitle>
                <CardDescription>
                    Tahun {new Date().getFullYear()}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={data}
                            dataKey="total"
                            nameKey="name"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        'cx' in viewBox &&
                                        'cy' in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalSemuanya.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Menampilkan total semuanya dalam setahun.
                </div>
            </CardFooter>
        </Card>
    );
};

const Chart3 = ({ data }: { data: ChartData3[] }) => {
    const totalPengguna = data[0].admin + data[0].petugas;

    const chartConfig = {
        admin: {
            label: 'Admin',
            color: 'hsl(var(--chart-1))',
        },
        petugas: {
            label: 'Petugas',
            color: 'hsl(var(--chart-2))',
        },
    };

    return (
        <Card className="col-span-4 row-span-3 flex flex-col lg:col-span-1 lg:row-span-1">
            <CardHeader className="pb-0">
                <CardTitle>Pengguna</CardTitle>
                <CardDescription>
                    Total pengguna {import.meta.env.VITE_APP_NAME}.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[250px]"
                >
                    <RadialBarChart
                        data={data}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={130}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis
                            tick={false}
                            tickLine={false}
                            axisLine={false}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        'cx' in viewBox &&
                                        'cy' in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {totalPengguna.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="fill-muted-foreground"
                                                >
                                                    Pengguna
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="admin"
                            stackId="a"
                            cornerRadius={5}
                            fill="var(--color-admin)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="petugas"
                            fill="var(--color-petugas)"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Menampilkan total pengguna.
                </div>
            </CardFooter>
        </Card>
    );
};
