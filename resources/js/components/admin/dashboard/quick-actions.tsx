import {
    Building2,
    FilePlus2,
    FileUp,
    FolderPlus,
    Megaphone,
    MessageSquare,
    Newspaper,
    UserPlus,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const quickActions: { label: string; icon: LucideIcon }[] = [
    { label: 'Add Customer', icon: UserPlus },
    { label: 'Add Project', icon: FolderPlus },
    { label: 'Add Proprietor', icon: Building2 },
    { label: 'Upload Doc', icon: FileUp },
    { label: 'Notification', icon: Megaphone },
    { label: 'Publish News', icon: Newspaper },
    { label: 'Publish Blog', icon: FilePlus2 },
    { label: 'Review Forum', icon: MessageSquare },
];

export function QuickActions() {
    return (
        <div>
            <h3 className="mb-4 text-lg font-semibold text-secondary">
                Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
                {quickActions.map((action) => (
                    <button
                        key={action.label}
                        type="button"
                        className="group flex flex-col items-center justify-center gap-2 rounded-lg border bg-muted/40 p-4 transition-all hover:bg-secondary hover:text-secondary-foreground"
                    >
                        <action.icon className="size-6 text-primary transition-colors group-hover:text-secondary-foreground" />
                        <span className="text-center text-xs font-medium">
                            {action.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
