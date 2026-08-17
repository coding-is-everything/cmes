import type { ReactNode } from 'react';

type Props = {
    title: string;
    action?: ReactNode;
    className?: string;
    children: ReactNode;
};

export function ChartCard({ title, action, className, children }: Props) {
    return (
        <div
            className={`flex flex-col rounded-lg border bg-card p-6 shadow-sm ${className ?? ''}`}
        >
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-secondary">
                    {title}
                </h3>
                {action}
            </div>
            {children}
        </div>
    );
}
