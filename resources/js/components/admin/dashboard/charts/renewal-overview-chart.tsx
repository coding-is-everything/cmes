import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChartCard } from './chart-card';

type Bar = {
    label: string;
    value: number;
    icon: LucideIcon;
    barClass: string;
    textClass: string;
};

const bars: Bar[] = [
    {
        label: 'Renewed',
        value: 450,
        icon: CheckCircle2,
        barClass: 'bg-emerald-500',
        textClass: 'text-emerald-700 dark:text-emerald-400',
    },
    {
        label: 'Due Soon',
        value: 210,
        icon: Clock,
        barClass: 'bg-primary',
        textClass: 'text-primary',
    },
    {
        label: 'Overdue',
        value: 85,
        icon: AlertTriangle,
        barClass: 'bg-destructive',
        textClass: 'text-destructive',
    },
];

const AXIS_MAX = 500;
const AXIS_STEPS = [0, 250, 500];

export function RenewalOverviewChart() {
    return (
        <ChartCard title="Renewal Overview" className="lg:col-span-2">
            <div className="flex h-56 gap-6 pl-10">
                <div className="relative flex-1">
                    <div className="absolute inset-0 flex flex-col justify-between">
                        {AXIS_STEPS.slice()
                            .reverse()
                            .map((step) => (
                                <div
                                    key={step}
                                    className="flex items-center gap-2"
                                >
                                    <span className="-ml-10 w-8 text-right text-xs text-muted-foreground">
                                        {step}
                                    </span>
                                    <div className="h-px flex-1 bg-border" />
                                </div>
                            ))}
                    </div>

                    <div className="relative flex h-full items-end justify-around">
                        {bars.map((bar) => {
                            const heightPct = (bar.value / AXIS_MAX) * 100;

                            return (
                                <div
                                    key={bar.label}
                                    tabIndex={0}
                                    className="group relative flex h-full w-20 flex-col items-center justify-end gap-2 outline-none"
                                >
                                    <div className="pointer-events-none absolute bottom-full mb-2 rounded bg-secondary px-2 py-1 text-xs whitespace-nowrap text-secondary-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                                        {bar.label}: {bar.value}
                                    </div>

                                    <span
                                        className={cn(
                                            'text-sm font-semibold',
                                            bar.textClass,
                                        )}
                                    >
                                        {bar.value}
                                    </span>

                                    <div
                                        className={cn(
                                            'w-full max-w-12 rounded-t-sm transition-opacity group-hover:opacity-80',
                                            bar.barClass,
                                        )}
                                        style={{ height: `${heightPct}%` }}
                                    />

                                    <div className="flex items-center gap-1.5">
                                        <bar.icon
                                            className={cn(
                                                'size-3.5',
                                                bar.textClass,
                                            )}
                                        />
                                        <span className="text-xs font-medium text-muted-foreground">
                                            {bar.label}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </ChartCard>
    );
}
