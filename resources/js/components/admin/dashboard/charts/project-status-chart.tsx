import { cn } from '@/lib/utils';
import { ChartCard } from './chart-card';

type Segment = {
    label: string;
    value: number;
    share: number;
    barClass: string;
    swatchClass: string;
};

const segments: Segment[] = [
    {
        label: 'Active',
        value: 1820,
        share: 65,
        barClass: 'bg-emerald-500 dark:bg-emerald-500',
        swatchClass: 'bg-emerald-500',
    },
    {
        label: 'Inactive',
        value: 560,
        share: 20,
        barClass: 'bg-slate-400 dark:bg-slate-500',
        swatchClass: 'bg-slate-400 dark:bg-slate-500',
    },
    {
        label: 'In Process',
        value: 280,
        share: 10,
        barClass: 'bg-primary',
        swatchClass: 'bg-primary',
    },
    {
        label: 'Expired',
        value: 140,
        share: 5,
        barClass: 'bg-destructive',
        swatchClass: 'bg-destructive',
    },
];

const total = segments.reduce((sum, segment) => sum + segment.value, 0);

export function ProjectStatusChart() {
    return (
        <ChartCard title="Project Status">
            <div className="mb-6">
                <p className="text-4xl font-bold text-secondary">
                    {(total / 1000).toFixed(1)}k
                </p>
                <p className="text-sm text-muted-foreground">Total projects</p>
            </div>

            <div
                className="flex h-4 w-full overflow-hidden rounded-full"
                role="img"
                aria-label={segments
                    .map((s) => `${s.label} ${s.share}%`)
                    .join(', ')}
            >
                {segments.map((segment, index) => (
                    <div
                        key={segment.label}
                        className={cn(
                            'group relative h-full outline-none focus-visible:ring-2 focus-visible:ring-ring',
                            segment.barClass,
                            index > 0 && 'ml-0.5',
                        )}
                        style={{ width: `${segment.share}%` }}
                        tabIndex={0}
                    >
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded bg-secondary px-2 py-1 text-xs whitespace-nowrap text-secondary-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                            {segment.label}: {segment.value.toLocaleString()} (
                            {segment.share}%)
                        </div>
                    </div>
                ))}
            </div>

            <ul className="mt-6 grid grid-cols-2 gap-3">
                {segments.map((segment) => (
                    <li
                        key={segment.label}
                        className="flex items-center gap-2 text-sm"
                    >
                        <span
                            className={cn(
                                'size-2.5 shrink-0 rounded-full',
                                segment.swatchClass,
                            )}
                        />
                        <span className="text-muted-foreground">
                            {segment.label}
                        </span>
                        <span className="ml-auto font-medium text-secondary">
                            {segment.share}%
                        </span>
                    </li>
                ))}
            </ul>
        </ChartCard>
    );
}
