import { router } from '@inertiajs/react';
import { pickBy } from 'lodash';
import React from 'react';

import { cn } from '@/lib/utils';
import { Pagination, TableHeaderType } from '@/types';

import SearchDebounced from '@/components/search-debounced';
import TableFilter from '@/components/table-filter';
import TableLoading from '@/components/table-loading';
import TableOrder from '@/components/table-order';
import TablePagination from '@/components/table-pagination';
import TablePerpage from '@/components/table-perpage';
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface TableDataProps extends Pagination {
    caption?: string;
    header: TableHeaderType[];
    isFilter?: boolean;
    isSort?: boolean;
    filterData?: { name: string; value: string }[];
    sortData?: { name: string; value: string }[];
    link: string;
    children: React.ReactNode;
}

function TableData({
    caption,
    header,
    isFilter = true,
    isSort = true,
    filterData,
    sortData,
    link,
    children,
    from,
    to,
    total,
    links,
    prev_page_url,
    next_page_url,
}: TableDataProps) {
    // states
    const [isChanged, setIsChanged] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState<string>('');
    const [perpage, setPerpage] = React.useState<number>(10);
    const [filter, setFilter] = React.useState<string>(
        isFilter ? filterData![0]?.value : '',
    );
    const [sort, setSort] = React.useState<string>(
        isSort ? sortData![0]?.value : '',
    );
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // events
    const getData = React.useCallback(() => {
        if (isChanged) {
            setIsLoading(true);

            router.get(
                route(link),
                pickBy({
                    perpage: perpage !== 10 ? perpage : '',
                    search,
                    filter,
                    sort,
                }),
                {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        setIsChanged(false);
                    },
                },
            );

            setIsLoading(false);
        }
    }, [isChanged, link, perpage, search, filter, sort]);

    return (
        <div className="flex w-full flex-col gap-5">
            <div className="flex w-full flex-col gap-5 lg:flex-row">
                <div className="flex gap-5">
                    <TablePerpage
                        perPage={perpage}
                        setPerPage={setPerpage}
                        setIsChanged={setIsChanged}
                    />

                    {isFilter && (
                        <TableFilter
                            data={filterData!}
                            filter={filter}
                            setFilter={setFilter}
                            setIsChanged={setIsChanged}
                        />
                    )}

                    {isSort && (
                        <TableOrder
                            data={sortData!}
                            sort={sort}
                            setSort={setSort}
                            setIsChanged={setIsChanged}
                        />
                    )}
                </div>

                <SearchDebounced
                    search={search}
                    setSearch={setSearch}
                    getData={getData}
                    setIsChanged={setIsChanged}
                    className="w-full"
                />
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    {caption && <TableCaption>{caption}</TableCaption>}
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
                        {isLoading ? (
                            <TableLoading span={header.length} />
                        ) : (
                            children
                        )}
                    </TableBody>
                </Table>
            </div>

            <TablePagination
                from={from}
                to={to}
                total={total}
                links={links}
                prev_page_url={prev_page_url}
                next_page_url={next_page_url}
            />
        </div>
    );
}

export default TableData;
