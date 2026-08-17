import {
    CalendarX,
    FileText,
    HardHat,
    Headset,
    MessageSquare,
    Network,
    RefreshCw,
    Users,
} from 'lucide-react';
import type { MetricCardProps } from './metric-card';
import { MetricCard } from './metric-card';

const metrics: MetricCardProps[] = [
    {
        icon: Users,
        label: 'Total Customers',
        value: '1,248',
        badgeText: '+12%',
        badgeTone: 'success',
    },
    {
        icon: Network,
        label: 'Total Projects / Khadans',
        value: '2,845',
        badgeText: 'Stable',
        badgeTone: 'success',
    },
    {
        icon: HardHat,
        label: 'Active Projects',
        value: '2,310',
        badgeText: '81%',
        badgeTone: 'success',
    },
    {
        icon: RefreshCw,
        label: 'Renewal Due Soon',
        value: '86',
        badgeText: 'Priority',
        badgeTone: 'warning',
        iconTone: 'warning',
        accent: 'warning',
    },
    {
        icon: CalendarX,
        label: 'Expired Projects',
        value: '24',
        badgeText: 'Critical',
        badgeTone: 'critical',
        iconTone: 'critical',
        accent: 'critical',
    },
    {
        icon: FileText,
        label: 'Pending Documents',
        value: '137',
        badgeText: 'Review',
        badgeTone: 'warning',
    },
    {
        icon: Headset,
        label: 'Unread Customer Issues',
        value: '32',
        badgeText: 'Attention',
        badgeTone: 'warning',
        iconTone: 'warning',
    },
    {
        icon: MessageSquare,
        label: 'Active Community Discussions',
        value: '148',
        badgeText: 'Active',
        badgeTone: 'success',
    },
];

export function MetricCards() {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
            ))}
        </div>
    );
}
