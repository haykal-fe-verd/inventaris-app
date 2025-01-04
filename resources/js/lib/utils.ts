import { Navigation, NavigationItem } from '@/data/navigations';
import { Permission } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getInitial(name: string | null | undefined): string {
    if (!name) return '?';

    const nameParts = name.split(' ');
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
    const lastInitial =
        nameParts.length > 1 ? nameParts[1]?.charAt(0).toUpperCase() || '' : '';
    return firstInitial + lastInitial;
}

export function transformPermission(permission: string) {
    return permission
        .replace('view', 'lihat')
        .replace('insert', 'tambah')
        .replace('update', 'edit')
        .replace('delete', 'hapus')
        .replace(/_/g, ' ');
}

export function filterByRole(navigations: Navigation[], roles: string[]) {
    return navigations
        .filter(
            (nav) => !nav.role || nav.role.some((role) => roles.includes(role)),
        )
        .map((nav) => ({
            ...nav,
            items: nav.items.filter(
                (item) =>
                    !item.role ||
                    item.role.some((role) => roles.includes(role)),
            ),
        }));
}

export function filterByPermission(
    navigations: Navigation[],
    permissions: string[],
) {
    const hasPermission = (item: NavigationItem) =>
        !item.permission ||
        item.permission.some((perm) => permissions.includes(perm));

    const filterItems = (items: NavigationItem[]): NavigationItem[] =>
        items.filter(hasPermission).map((item) => ({
            ...item,
            child: item.child ? filterItems(item.child) : undefined,
        }));

    return navigations.map((nav) => ({
        ...nav,
        items: filterItems(nav.items),
    }));
}

export function filterNavigation(
    navigations: Navigation[],
    userRole: string[],
    userPermissions: string[],
): Navigation[] {
    const navigationByRole = filterByRole(navigations, userRole || []);
    const navigationByPermission = filterByPermission(
        navigationByRole,
        userPermissions || [],
    );

    return navigationByPermission.filter((nav) => nav.items.length > 0);
}

export function groupedPermissions(permissions: Permission[]) {
    return permissions.reduce(
        (acc: Record<string, Permission[]>, permission) => {
            const prefix = permission.name.split('_')[1];

            if (!acc[prefix]) {
                acc[prefix] = [];
            }

            acc[prefix].push(permission);
            return acc;
        },
        {},
    );
}

export function hasPermissions(
    userPermissions: string[],
    requiredPermissions: string[],
): boolean {
    return requiredPermissions.some((permission) =>
        userPermissions.includes(permission),
    );
}

export function hasRoles(
    userRoles: string[],
    requiredRoles: string[],
): boolean {
    return requiredRoles.some((role) => userRoles.includes(role));
}

export function hasRolesPermissions(
    userRoles: string[],
    requiredRoles: string[],
    userPermissions: string[],
    requiredPermissions: string[],
): boolean {
    return (
        hasRoles(userRoles, requiredRoles) ||
        hasPermissions(userPermissions, requiredPermissions)
    );
}

export function formatedDate(tanggal: string) {
    const date = new Date(tanggal);

    const pad = (num: number) => (num < 10 ? `0${num}` : num);

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

export function formatedDateSimple(tanggal: string) {
    const date = new Date(tanggal);

    const pad = (num: number) => (num < 10 ? `0${num}` : num);

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

export function truncateText(
    text: string | null | undefined,
    textLimit: number,
): string {
    if (!text) {
        return '-';
    }

    if (text.length > textLimit) {
        return text.slice(0, textLimit) + '...';
    }

    return text;
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
}
