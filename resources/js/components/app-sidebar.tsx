import { ChevronRight } from 'lucide-react';
import * as React from 'react';

import { NavUser } from '@/components/nav-user';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { navigations } from '@/data/navigations';
import { filterNavigation } from '@/lib/utils';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Icons } from './icons';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    // hooks
    const { auth } = usePage<PageProps>().props;

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary">
                                    <Icons.Logo className="size-4 fill-background" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">
                                        {import.meta.env.VITE_APP_NAME}
                                    </span>
                                    <span className="">
                                        v {import.meta.env.VITE_APP_VERSION}
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarItem />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={auth.user} />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}

export function SidebarItem() {
    // hooks
    const { ziggy, auth } = usePage<PageProps>().props;

    const filteredNavigations = filterNavigation(
        navigations,
        auth.user.roles!,
        auth.user.permissions!,
    );

    return filteredNavigations.map((item) => {
        return (
            <SidebarGroup key={item.label}>
                <SidebarGroupLabel>{item.label}</SidebarGroupLabel>

                <SidebarMenu>
                    {item.items.map((subItem) => {
                        // states
                        const isActive =
                            ziggy.location === subItem.url ||
                            ziggy.location.startsWith(subItem.url + '/');

                        if (subItem.child) {
                            // states
                            const defaultOpen = subItem.child.some(
                                (childItemOpen) =>
                                    ziggy.location === childItemOpen.url ||
                                    ziggy.location.startsWith(
                                        childItemOpen.url + '/',
                                    ),
                            );

                            return (
                                <Collapsible
                                    key={subItem.name}
                                    asChild
                                    className="group/collapsible"
                                    defaultOpen={defaultOpen}
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={subItem.name}
                                            >
                                                {subItem.icon && (
                                                    <subItem.icon />
                                                )}
                                                <span>{subItem.name}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>

                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {subItem.child?.map(
                                                    (childItem) => {
                                                        // states
                                                        const isActiveChild =
                                                            ziggy.location ===
                                                                childItem.url ||
                                                            ziggy.location.startsWith(
                                                                childItem.url +
                                                                    '/',
                                                            );

                                                        return (
                                                            <SidebarMenuSubItem
                                                                key={
                                                                    childItem.name
                                                                }
                                                            >
                                                                <SidebarMenuSubButton
                                                                    asChild
                                                                    isActive={
                                                                        isActiveChild
                                                                    }
                                                                >
                                                                    <Link
                                                                        href={
                                                                            childItem.url
                                                                        }
                                                                    >
                                                                        <span>
                                                                            {
                                                                                childItem.name
                                                                            }
                                                                        </span>
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        );
                                                    },
                                                )}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            );
                        }

                        return (
                            <SidebarMenuItem key={subItem.name}>
                                <SidebarMenuButton asChild isActive={isActive}>
                                    <Link href={subItem.url}>
                                        {subItem.icon && <subItem.icon />}
                                        <span>{subItem.name}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroup>
        );
    });
}
