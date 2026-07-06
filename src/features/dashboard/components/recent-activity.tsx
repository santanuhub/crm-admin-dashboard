import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// TODO: replace with activityApi query
const activityItems = [
  {
    id: 1,
    name: "Sarah Chen",
    action: "created a new deal",
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: 2,
    name: "Mina Patel",
    action: "updated the lead status",
    createdAt: new Date(Date.now() - 1000 * 60 * 90),
  },
  {
    id: 3,
    name: "Elliot Brooks",
    action: "scheduled a follow-up call",
    createdAt: new Date(Date.now() - 1000 * 60 * 180),
  },
  {
    id: 4,
    name: "Nora Kim",
    action: "added a new contact",
    createdAt: new Date(Date.now() - 1000 * 60 * 240),
  },
  {
    id: 5,
    name: "Jordan Lee",
    action: "closed a deal",
    createdAt: new Date(Date.now() - 1000 * 60 * 360),
  },
  {
    id: 6,
    name: "Alicia Gomez",
    action: "moved a deal to negotiation",
    createdAt: new Date(Date.now() - 1000 * 60 * 480),
  },
  {
    id: 7,
    name: "Devin Shah",
    action: "completed a task",
    createdAt: new Date(Date.now() - 1000 * 60 * 720),
  },
  {
    id: 8,
    name: "Liam Ortiz",
    action: "sent a proposal",
    createdAt: new Date(Date.now() - 1000 * 60 * 1440),
  },
];

export function RecentActivity() {
  return (
    <Card className="border-border/70 bg-card/80 shadow-sm">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {activityItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/60 p-3 dark:bg-background/30"
              >
                <Avatar size="sm">
                  <AvatarFallback>
                    {item.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {item.name} {item.action}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDistanceToNow(item.createdAt, { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
