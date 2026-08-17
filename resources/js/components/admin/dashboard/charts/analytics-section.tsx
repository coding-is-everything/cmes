import { CustomerGrowthChart } from './customer-growth-chart';
import { MineralDistributionChart } from './mineral-distribution-chart';
import { ProjectStatusChart } from './project-status-chart';
import { RenewalOverviewChart } from './renewal-overview-chart';

export function AnalyticsSection() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <ProjectStatusChart />
            <CustomerGrowthChart />
            <RenewalOverviewChart />
            <MineralDistributionChart />
        </div>
    );
}
