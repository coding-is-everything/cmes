import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type MetricTone = 'neutral' | 'warning' | 'critical';

const iconToneClasses: Record<MetricTone, string> = {
    neutral: 'bg-secondary text-primary',
    warning: 'bg-primary/15 text-primary',
    critical: 'bg-destructive/15 text-destructive',
};

const badgeToneClasses: Record<'success' | 'warning' | 'critical', string> = {
    success: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
    warning: 'bg-primary/15 text-primary',
    critical: 'bg-destructive/15 text-destructive',
};

const valueToneClasses: Record<MetricTone, string> = {
    neutral: 'text-secondary',
    warning: 'text-primary',
    critical: 'text-destructive',
};

const accentToneClasses: Record<'warning' | 'critical', string> = {
    warning: 'bg-primary',
    critical: 'bg-destructive',
};

export type MetricCardProps = {
    icon: LucideIcon;
    label: string;
    value: string;
    badgeText: string;
    badgeTone: 'success' | 'warning' | 'critical';
    iconTone?: MetricTone;
    accent?: 'warning' | 'critical';
};

export function MetricCard({
    icon: Icon,
    label,
    value,
    badgeText,
    badgeTone,
    iconTone = 'neutral',
    accent,
}: MetricCardProps) {
    return (
        <div className="relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all hover:bg-muted/40">
            {accent && (
                <div
                    className={cn(
                        'absolute top-0 right-0 h-full w-1.5',
                        accentToneClasses[accent],
                    )}
                />
            )}

            <div className="mb-4 flex items-start justify-between">
                <div
                    className={cn(
                        'flex size-12 items-center justify-center rounded',
                        iconToneClasses[iconTone],
                    )}
                >
                    <Icon className="size-6" />
                </div>
                <span
                    className={cn(
                        'rounded px-2 py-1 text-xs font-medium',
                        badgeToneClasses[badgeTone],
                    )}
                >
                    {badgeText}
                </span>
            </div>

            <h3 className="text-sm text-muted-foreground">{label}</h3>
            <p
                className={cn(
                    'mt-1 text-4xl font-bold',
                    valueToneClasses[iconTone],
                )}
            >
                {value}
            </p>
        </div>
    );
}
