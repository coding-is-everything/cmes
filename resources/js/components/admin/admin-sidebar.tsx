import { Link } from '@inertiajs/react';
import { Building2, ChevronDown } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useAdminSidebar } from '@/hooks/use-admin-sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { adminDashboardLink, adminNavGroups } from '@/lib/admin-nav';
import { cn } from '@/lib/utils';

export const ADMIN_SIDEBAR_WIDTH = 260;
export const ADMIN_SIDEBAR_WIDTH_COLLAPSED = 76;

function AdminSidebarBrand({ collapsed }: { collapsed: boolean }) {
    return (
        <div className="mb-4 border-b border-white/10 p-6">
            <div
                className={cn(
                    'flex items-center gap-3',
                    collapsed && 'justify-center',
                )}
            >
                <div className="flex size-10 shrink-0 items-center justify-center rounded bg-primary">
                    <Building2 className="size-5 text-secondary" />
                </div>
                {!collapsed && (
                    <div className="min-w-0">
                        <h1 className="truncate text-lg font-bold text-secondary-foreground">
                            CMES
                        </h1>
                        <p className="mt-1 truncate text-[11px] text-secondary-foreground/60">
                            Mining Management System
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function AdminSidebarNav({ collapsed }: { collapsed: boolean }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <div className="custom-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto pb-6">
            <div className="px-2">
                <Link
                    href={adminDashboardLink.href}
                    title={collapsed ? adminDashboardLink.title : undefined}
                    className={cn(
                        'flex items-center gap-3 rounded-r border-l-4 px-4 py-3 transition-all',
                        collapsed && 'justify-center px-0',
                        isCurrentUrl(adminDashboardLink.href)
                            ? 'border-primary bg-white/10 text-secondary-foreground'
                            : 'border-transparent text-secondary-foreground/70 hover:bg-white/5 hover:text-secondary-foreground',
                    )}
                >
                    <adminDashboardLink.icon className="size-5 shrink-0" />
                    {!collapsed && (
                        <span className="font-medium">
                            {adminDashboardLink.title}
                        </span>
                    )}
                </Link>
            </div>

            {collapsed ? (
                <div className="flex flex-col items-center gap-1 px-2">
                    {adminNavGroups
                        .flatMap((group) => group.items)
                        .map((item) => (
                            <span
                                key={item.title}
                                title={item.title}
                                className="flex size-10 cursor-default items-center justify-center rounded-md text-secondary-foreground/70"
                            >
                                <item.icon className="size-5" />
                            </span>
                        ))}
                </div>
            ) : (
                adminNavGroups.map((group) => (
                    <Collapsible key={group.title} className="px-2">
                        <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2 text-[11px] font-bold tracking-wider text-secondary-foreground/60 uppercase transition-opacity hover:opacity-100 [&[data-state=open]_svg]:rotate-180">
                            <span>{group.title}</span>
                            <ChevronDown className="size-[18px] transition-transform" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <ul className="mt-1 ml-6 flex flex-col gap-1 border-l border-white/10 pl-4">
                                {group.items.map((item) => (
                                    <li key={item.title}>
                                        <span className="flex cursor-default items-center gap-3 rounded-md px-4 py-2 text-sm text-secondary-foreground/70">
                                            <item.icon className="size-[20px]" />
                                            <span>{item.title}</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CollapsibleContent>
                    </Collapsible>
                ))
            )}
        </div>
    );
}

export function AdminSidebar() {
    const { open, isMobile, openMobile, setOpenMobile } = useAdminSidebar();

    if (isMobile) {
        return (
            <Sheet open={openMobile} onOpenChange={setOpenMobile}>
                <SheetContent
                    side="left"
                    className="w-[260px] gap-0 border-none bg-secondary p-0 text-secondary-foreground"
                >
                    <SheetTitle className="sr-only">
                        Admin navigation
                    </SheetTitle>
                    <AdminSidebarBrand collapsed={false} />
                    <AdminSidebarNav collapsed={false} />
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <nav
            className="fixed top-0 left-0 z-20 flex h-screen flex-col border-r border-secondary bg-secondary text-secondary-foreground transition-[width] duration-200"
            style={{
                width: open
                    ? ADMIN_SIDEBAR_WIDTH
                    : ADMIN_SIDEBAR_WIDTH_COLLAPSED,
            }}
        >
            <AdminSidebarBrand collapsed={!open} />
            <AdminSidebarNav collapsed={!open} />
        </nav>
    );
}
