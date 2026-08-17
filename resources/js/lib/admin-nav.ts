import {
    Activity,
    BarChart3,
    Bell,
    Briefcase,
    Clock,
    FileEdit,
    FileText,
    FolderTree,
    History,
    LayoutDashboard,
    Megaphone,
    MessageSquare,
    Network,
    Newspaper,
    PieChart,
    RefreshCw,
    Settings,
    ShieldCheck,
    TrendingUp,
    UserCheck,
    UserCog,
    Users,
} from 'lucide-react';
import { dashboard } from '@/routes/admin';
import type { AdminNavGroup } from '@/types/navigation';

export const adminDashboardLink = {
    title: 'Dashboard',
    href: dashboard(),
    icon: LayoutDashboard,
};

export const adminNavGroups: AdminNavGroup[] = [
    {
        title: 'Customer Management',
        items: [
            { title: 'Customers', icon: Users },
            { title: 'Proprietors', icon: UserCheck },
            { title: 'Customer Projects', icon: Briefcase },
        ],
    },
    {
        title: 'Project Management',
        items: [
            { title: 'Projects / Khadans', icon: Network },
            { title: 'Renewals', icon: RefreshCw },
            { title: 'Documents', icon: FileText },
            { title: 'Project Updates', icon: Clock },
        ],
    },
    {
        title: 'Content Management',
        items: [
            { title: 'News', icon: Newspaper },
            { title: 'Blogs', icon: FileEdit },
            { title: 'Categories', icon: FolderTree },
        ],
    },
    {
        title: 'Communication',
        items: [
            { title: 'Notifications', icon: Bell },
            { title: 'Push Campaigns', icon: Megaphone },
            { title: 'Community', icon: MessageSquare },
        ],
    },
    {
        title: 'Reports',
        items: [
            { title: 'Customer Reports', icon: BarChart3 },
            { title: 'Project Reports', icon: PieChart },
            { title: 'Renewal Reports', icon: TrendingUp },
            { title: 'Activity Reports', icon: Activity },
        ],
    },
    {
        title: 'Administration',
        items: [
            { title: 'Admin Users', icon: ShieldCheck },
            { title: 'Roles & Permissions', icon: UserCog },
            { title: 'Activity Logs', icon: History },
            { title: 'Settings', icon: Settings },
        ],
    },
];
