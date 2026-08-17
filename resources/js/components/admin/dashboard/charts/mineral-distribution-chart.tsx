import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChartCard } from './chart-card';

const minerals = [
    { label: 'Coal', share: 45 },
    { label: 'Iron Ore', share: 28 },
    { label: 'Limestone', share: 15 },
    { label: 'Others', share: 12 },
];

export function MineralDistributionChart() {
    const [tab, setTab] = useState<'mineral' | 'state'>('mineral');

    return (
        <ChartCard
            title="Distribution"
            action={
                <div className="flex gap-1 rounded-md border p-0.5">
                    <button
                        type="button"
                        onClick={() => setTab('mineral')}
                        className={cn(
                            'rounded px-2.5 py-1 text-xs font-medium transition-colors',
                            tab === 'mineral'
                                ? 'bg-secondary text-secondary-foreground'
                                : 'text-muted-foreground hover:text-secondary',
                        )}
                    >
                        Mineral
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab('state')}
                        disabled
                        title="Coming soon"
                        className="cursor-not-allowed rounded px-2.5 py-1 text-xs font-medium text-muted-foreground/50"
                    >
                        State
                    </button>
                </div>
            }
        >
            {tab === 'mineral' && (
                <ul className="flex flex-1 flex-col justify-center gap-5">
                    {minerals.map((mineral) => (
                        <li key={mineral.label}>
                            <div className="mb-2 flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    {mineral.label}
                                </span>
                                <span className="font-semibold text-secondary">
                                    {mineral.share}%
                                </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                                <div
                                    className="h-2 rounded-full bg-secondary"
                                    style={{ width: `${mineral.share}%` }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </ChartCard>
    );
}
