import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// TODO: replace with real data
const leadSourceData = [
  { source: "Website", value: 35, color: "var(--color-primary)" },
  { source: "Referral", value: 25, color: "var(--color-chart-2)" },
  { source: "Social", value: 20, color: "var(--color-chart-3)" },
  { source: "Cold Outreach", value: 20, color: "var(--color-chart-4)" },
];

export function LeadsBySourceChart() {
  return (
    <Card className="border-border/70 bg-card/80 shadow-sm">
      <CardHeader>
        <CardTitle>Leads by Source</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={leadSourceData}
                dataKey="value"
                nameKey="source"
                innerRadius={58}
                outerRadius={88}
                paddingAngle={3}
              >
                {leadSourceData.map((entry) => (
                  <Cell key={entry.source} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "0.75rem",
                  color: "var(--color-foreground)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          {leadSourceData.map((entry) => (
            <div
              key={entry.source}
              className="flex items-center justify-between gap-2 text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-muted-foreground">{entry.source}</span>
              </div>
              <span className="font-medium text-foreground">
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
