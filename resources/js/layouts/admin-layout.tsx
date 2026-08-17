import type { PropsWithChildren } from 'react';
import {
    ADMIN_SIDEBAR_WIDTH,
    ADMIN_SIDEBAR_WIDTH_COLLAPSED,
    AdminSidebar,
} from '@/components/admin/admin-sidebar';
import { AdminTopbar } from '@/components/admin/admin-topbar';
import {
    AdminSidebarProvider,
    useAdminSidebar,
} from '@/hooks/use-admin-sidebar';
import type { AdminUser } from '@/types/auth';

type Props = PropsWithChildren<{
    title?: string;
    admin?: AdminUser | null;
    adminSidebarOpen?: boolean;
}>;

function AdminLayoutContent({ title = 'Dashboard', admin, children }: Props) {
    const { open, isMobile } = useAdminSidebar();
    const marginLeft = isMobile
        ? 0
        : open
          ? ADMIN_SIDEBAR_WIDTH
          : ADMIN_SIDEBAR_WIDTH_COLLAPSED;

    return (
        <div className="flex min-h-screen bg-background">
            <AdminSidebar />

            <div
                className="flex flex-1 flex-col transition-[margin-left] duration-200"
                style={{ marginLeft }}
            >
                <AdminTopbar title={title} admin={admin ?? null} />

                <main className="mx-auto w-full max-w-[1440px] flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default function AdminLayout({
    adminSidebarOpen = true,
    ...props
}: Props) {
    return (
        <AdminSidebarProvider defaultOpen={adminSidebarOpen}>
            <AdminLayoutContent {...props} />
        </AdminSidebarProvider>
    );
}
