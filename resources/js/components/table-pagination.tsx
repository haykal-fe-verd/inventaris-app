import { Pagination as PaginationType } from '@/types';

import { cn } from '@/lib/utils';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface TablePaginationProps extends PaginationType {
    className?: string;
}

function TablePagination({
    className,
    from,
    to,
    total,
    links,
    prev_page_url,
    next_page_url,
}: TablePaginationProps) {
    return (
        <div className={cn('overflow-hidden', className)}>
            <p className="mb-3 text-center text-sm">
                Menampilkan <span className="font-bold">{from}</span> dari{' '}
                <span className="font-bold">{to} </span>
                total <span className="font-bold">{total}</span> Items
            </p>

            <Pagination>
                <PaginationContent className="flex flex-wrap justify-center gap-2 md:flex-nowrap">
                    {links!.map((link, index: number) => {
                        if (link.label === '&laquo; Sebelumnya') {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationPrevious
                                        href={link.url!}
                                        className={
                                            !prev_page_url
                                                ? 'pointer-events-none bg-muted text-muted-foreground opacity-50'
                                                : ''
                                        }
                                    />
                                </PaginationItem>
                            );
                        }

                        if (link.label === 'Berikutnya &raquo;') {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationNext
                                        href={link.url!}
                                        className={
                                            !next_page_url
                                                ? 'pointer-events-none bg-muted text-muted-foreground opacity-50'
                                                : ''
                                        }
                                    />
                                </PaginationItem>
                            );
                        }

                        if (link.label === '...') {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }

                        return (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href={link.url!}
                                    isActive={link.active}
                                >
                                    {link.label}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}
                </PaginationContent>
            </Pagination>
        </div>
    );
}

export default TablePagination;
