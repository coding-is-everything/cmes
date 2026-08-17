import { Head, usePage } from '@inertiajs/react';
import { AnalyticsSection } from '@/components/admin/dashboard/charts/analytics-section';
import { CriticalRenewalsTable } from '@/components/admin/dashboard/critical-renewals-table';
import { MetricCards } from '@/components/admin/dashboard/metric-cards';
import { QuickActions } from '@/components/admin/dashboard/quick-actions';
import { RecentActivity } from '@/components/admin/dashboard/recent-activity';

export default function AdminDashboard() {
    const { admin } = usePage().props;

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-secondary lg:text-3xl">
                    Operational Overview
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Real-time metrics and critical updates across all mining
                    operations.
                </p>
                {admin && (
                    <p className="mt-1 text-xs text-muted-foreground">
                        Welcome back, {admin.full_name}.
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-6">
                <QuickActions />

                <MetricCards />

                <AnalyticsSection />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <CriticalRenewalsTable />
                    </div>
                    <RecentActivity />
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = { title: 'Account Overview' };
