import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const ADMIN_SIDEBAR_COOKIE_NAME = 'admin_sidebar_state';
const ADMIN_SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

type AdminSidebarContextValue = {
    open: boolean;
    toggleSidebar: () => void;
    isMobile: boolean;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
};

const AdminSidebarContext = createContext<AdminSidebarContextValue | null>(
    null,
);

export function AdminSidebarProvider({
    defaultOpen = true,
    children,
}: {
    defaultOpen?: boolean;
    children: React.ReactNode;
}) {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(defaultOpen);
    const [openMobile, setOpenMobile] = useState(false);

    const toggleSidebar = useCallback(() => {
        if (isMobile) {
            setOpenMobile((current) => !current);

            return;
        }

        setOpen((current) => {
            const next = !current;

            document.cookie = `${ADMIN_SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=${ADMIN_SIDEBAR_COOKIE_MAX_AGE}`;

            return next;
        });
    }, [isMobile]);

    const value = useMemo<AdminSidebarContextValue>(
        () => ({ open, toggleSidebar, isMobile, openMobile, setOpenMobile }),
        [open, toggleSidebar, isMobile, openMobile],
    );

    return (
        <AdminSidebarContext.Provider value={value}>
            {children}
        </AdminSidebarContext.Provider>
    );
}

export function useAdminSidebar(): AdminSidebarContextValue {
    const context = useContext(AdminSidebarContext);

    if (!context) {
        throw new Error(
            'useAdminSidebar must be used within an AdminSidebarProvider',
        );
    }

    return context;
}
