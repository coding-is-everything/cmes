import {
    FileUp,
    MessageSquare,
    Newspaper,
    Pencil,
    RefreshCw,
    UserPlus,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const activity: {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    time: string;
    tone?: 'success';
}[] = [
    {
        icon: Pencil,
        title: 'Project Updated: Rajhara Iron Ore Mine',
        subtitle: 'Updated by Admin User',
        time: '15 minutes ago',
    },
    {
        icon: UserPlus,
        title: 'New Customer Added: Global Logistics Ltd',
        subtitle: 'Registered by System',
        time: '45 mins ago',
    },
    {
        icon: FileUp,
        title: 'Document Uploaded: Safety Clearance PDF',
        subtitle: 'PRJ-8821 by Sarah Jenkins',
        time: '2 hours ago',
    },
    {
        icon: RefreshCw,
        title: 'Renewal Updated: PRJ-9102',
        subtitle: "Status changed to 'In Review'",
        time: '4 hours ago',
        tone: 'success',
    },
    {
        icon: MessageSquare,
        title: 'Community Discussion Moderated',
        subtitle: "Topic: 'Environmental Safety'",
        time: '6 hours ago',
    },
    {
        icon: Newspaper,
        title: 'News Published: New Mining Regulations 2024',
        subtitle: 'By PR Team',
        time: 'Yesterday',
    },
];

export function RecentActivity() {
    return (
        <div className="flex flex-col rounded-lg border bg-card shadow-sm">
            <div className="border-b p-6">
                <h3 className="text-lg font-semibold text-secondary">
                    Recent Activity
                </h3>
            </div>

            <div className="custom-scrollbar max-h-[420px] flex-1 overflow-y-auto p-6">
                <ul className="relative ml-3 space-y-6 border-l">
                    {activity.map((item) => (
                        <li key={item.title} className="relative pl-6">
                            <span
                                className={cn(
                                    'absolute top-0 -left-3 flex size-6 items-center justify-center rounded-full border-2 border-card',
                                    item.tone === 'success'
                                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                                        : 'bg-secondary text-primary',
                                )}
                            >
                                <item.icon className="size-3.5" />
                            </span>
                            <p className="text-sm font-medium text-secondary">
                                {item.title}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {item.subtitle}
                            </p>
                            <span className="mt-2 block text-xs text-muted-foreground">
                                {item.time}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
