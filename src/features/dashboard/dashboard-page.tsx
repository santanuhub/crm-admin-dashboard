import {
  CircleDollarSign,
  ContactRound,
  TrendingUp,
  Users,
} from "lucide-react";
import { QuickActions } from "./components/quick-actions";
import { RecentActivity } from "./components/recent-activity";
import { RevenueChart } from "./components/revenue-chart";
import { LeadsBySourceChart } from "./components/leads-by-source-chart";
import { TopDealsTable } from "./components/top-deals-table";
import { UpcomingTasks } from "./components/upcoming-tasks";
import { StatCard } from "@/components/shared/stat-card";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl border border-border/70 bg-card/70 p-4 shadow-sm md:flex-row md:items-end md:justify-between md:p-6 dark:bg-card/50">
        <div className="space-y-1">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Overview
          </p>
          <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            A snapshot of your CRM activity, pipeline, and upcoming work.
          </p>
        </div>
        <QuickActions />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$482k"
          icon={CircleDollarSign}
          trend={18}
          trendLabel="vs last month"
        />
        <StatCard
          title="New Leads"
          value="124"
          icon={Users}
          trend={12}
          trendLabel="this week"
        />
        <StatCard
          title="Deals Won"
          value="31"
          icon={TrendingUp}
          trend={8}
          trendLabel="this quarter"
        />
        <StatCard
          title="Conversion Rate"
          value="24.6%"
          icon={ContactRound}
          trend={-3}
          trendLabel="vs last month"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <RevenueChart />
        <LeadsBySourceChart />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <RecentActivity />
        <UpcomingTasks />
      </div>

      <TopDealsTable />
    </div>
  );
}
