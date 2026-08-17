import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type RenewalStatus = 'Overdue' | 'Pending' | 'In Review';

const statusToneClasses: Record<RenewalStatus, string> = {
    Overdue: 'bg-destructive/15 text-destructive',
    Pending: 'bg-primary/15 text-primary',
    'In Review': 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
};

const renewals: {
    projectId: string;
    operator: string;
    expiryDate: string;
    status: RenewalStatus;
    isOverdue?: boolean;
}[] = [
    {
        projectId: 'PRJ-8821',
        operator: 'Atlas Mining Corp',
        expiryDate: 'Oct 12, 2023',
        status: 'Overdue',
        isOverdue: true,
    },
    {
        projectId: 'PRJ-7734',
        operator: 'Northern Extracts',
        expiryDate: 'Oct 28, 2023',
        status: 'Pending',
    },
    {
        projectId: 'PRJ-9102',
        operator: 'Delta Quarries',
        expiryDate: 'Nov 05, 2023',
        status: 'Pending',
    },
    {
        projectId: 'PRJ-6544',
        operator: 'EcoMine Solutions',
        expiryDate: 'Nov 15, 2023',
        status: 'In Review',
    },
];

export function CriticalRenewalsTable() {
    return (
        <div className="flex flex-col rounded-lg border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b p-6">
                <h3 className="text-lg font-semibold text-secondary">
                    Critical Renewals
                </h3>
                <button
                    type="button"
                    className="rounded border px-3 py-1.5 text-xs font-medium text-secondary transition-colors hover:bg-muted"
                >
                    View All
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b bg-muted/40 text-xs text-muted-foreground">
                            <th className="p-4 font-medium">Project ID</th>
                            <th className="p-4 font-medium">Operator</th>
                            <th className="p-4 font-medium">Expiry Date</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {renewals.map((renewal) => (
                            <tr
                                key={renewal.projectId}
                                className="border-b transition-colors last:border-b-0 hover:bg-muted/40"
                            >
                                <td className="p-4 font-semibold text-secondary">
                                    {renewal.projectId}
                                </td>
                                <td className="p-4">{renewal.operator}</td>
                                <td
                                    className={cn(
                                        'p-4',
                                        renewal.isOverdue &&
                                            'font-medium text-destructive',
                                    )}
                                >
                                    {renewal.expiryDate}
                                </td>
                                <td className="p-4">
                                    <span
                                        className={cn(
                                            'rounded px-2 py-1 text-xs font-medium',
                                            statusToneClasses[renewal.status],
                                        )}
                                    >
                                        {renewal.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button
                                        type="button"
                                        aria-label={`View ${renewal.projectId}`}
                                        className="text-primary hover:text-primary/80"
                                    >
                                        <ArrowRight className="size-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
