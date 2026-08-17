import { Form } from '@inertiajs/react';
import {
    Bell,
    Grid3x3,
    HelpCircle,
    LogOut,
    PanelLeft,
    Search,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useAdminSidebar } from '@/hooks/use-admin-sidebar';
import { useInitials } from '@/hooks/use-initials';
import admin from '@/routes/admin';
import type { AdminUser } from '@/types/auth';

type Props = {
    title: string;
    admin: AdminUser | null;
};

export function AdminTopbar({ title, admin: currentAdmin }: Props) {
    const getInitials = useInitials();
    const { toggleSidebar } = useAdminSidebar();

    return (
        <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between gap-4 border-b bg-card px-4 sm:px-8">
            <div className="flex items-center gap-2 sm:gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                    className="text-muted-foreground hover:text-secondary"
                >
                    <PanelLeft />
                </Button>
                <span className="truncate text-lg font-bold text-secondary">
                    {title}
                </span>
            </div>

            <div className="mx-2 hidden max-w-md flex-1 md:block">
                <div className="relative">
                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Global Search..."
                        className="rounded-full pl-10"
                    />
                </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="hidden text-muted-foreground hover:text-secondary sm:inline-flex"
                >
                    <Bell />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hidden text-muted-foreground hover:text-secondary sm:inline-flex"
                >
                    <HelpCircle />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hidden text-muted-foreground hover:text-secondary sm:inline-flex"
                >
                    <Grid3x3 />
                </Button>

                {currentAdmin && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="ml-2 rounded-full focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                            >
                                <Avatar className="size-8 border">
                                    <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">
                                        {getInitials(currentAdmin.full_name)}
                                    </AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel className="flex flex-col">
                                <span className="truncate font-medium">
                                    {currentAdmin.full_name}
                                </span>
                                <span className="truncate text-xs font-normal text-muted-foreground">
                                    {currentAdmin.email}
                                </span>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Form {...admin.logout.form()}>
                                {({ processing }) => (
                                    <DropdownMenuItem asChild>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full"
                                        >
                                            <LogOut />
                                            Log out
                                        </button>
                                    </DropdownMenuItem>
                                )}
                            </Form>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </header>
    );
}
