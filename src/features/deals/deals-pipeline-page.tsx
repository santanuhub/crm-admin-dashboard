import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Plus, UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/shared/page-header";
import type { Deal } from "@/types";

export const mockDeals: Deal[] = [
  {
    id: "deal-1",
    title: "Northwind Renewal",
    companyName: "Northwind",
    amount: 48000,
    currency: "USD",
    stage: "proposal",
    probability: 72,
    ownerId: "u1",
    status: "open",
    createdAt: "2026-06-05T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z",
  },
  {
    id: "deal-2",
    title: "Apex Analytics",
    companyName: "Apex Labs",
    amount: 125000,
    currency: "USD",
    stage: "negotiation",
    probability: 81,
    ownerId: "u2",
    status: "open",
    createdAt: "2026-05-10T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z",
  },
  {
    id: "deal-3",
    title: "Harbor Expansion",
    companyName: "Harbor One",
    amount: 92000,
    currency: "USD",
    stage: "qualification",
    probability: 58,
    ownerId: "u3",
    status: "open",
    createdAt: "2026-06-12T00:00:00.000Z",
    updatedAt: "2026-07-02T00:00:00.000Z",
  },
  {
    id: "deal-4",
    title: "Summit Platform",
    companyName: "Summit Co",
    amount: 64000,
    currency: "USD",
    stage: "prospecting",
    probability: 35,
    ownerId: "u4",
    status: "open",
    createdAt: "2026-06-20T00:00:00.000Z",
    updatedAt: "2026-07-03T00:00:00.000Z",
  },
  {
    id: "deal-5",
    title: "Lumen Migration",
    companyName: "LumenX",
    amount: 158000,
    currency: "USD",
    stage: "proposal",
    probability: 77,
    ownerId: "u5",
    status: "open",
    createdAt: "2026-05-28T00:00:00.000Z",
    updatedAt: "2026-06-29T00:00:00.000Z",
  },
  {
    id: "deal-6",
    title: "Cobalt Implementation",
    companyName: "Cobalt AI",
    amount: 88000,
    currency: "USD",
    stage: "negotiation",
    probability: 83,
    ownerId: "u6",
    status: "open",
    createdAt: "2026-05-15T00:00:00.000Z",
    updatedAt: "2026-07-04T00:00:00.000Z",
  },
  {
    id: "deal-7",
    title: "Atlas Renewal",
    companyName: "Atlas IO",
    amount: 111000,
    currency: "USD",
    stage: "qualification",
    probability: 51,
    ownerId: "u7",
    status: "open",
    createdAt: "2026-06-10T00:00:00.000Z",
    updatedAt: "2026-07-05T00:00:00.000Z",
  },
  {
    id: "deal-8",
    title: "Voyage AI Suite",
    companyName: "Voyage Dev",
    amount: 73000,
    currency: "USD",
    stage: "prospecting",
    probability: 39,
    ownerId: "u8",
    status: "open",
    createdAt: "2026-06-18T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z",
  },
  {
    id: "deal-9",
    title: "Meridian Onboarding",
    companyName: "Meridian AI",
    amount: 137000,
    currency: "USD",
    stage: "proposal",
    probability: 75,
    ownerId: "u9",
    status: "open",
    createdAt: "2026-05-30T00:00:00.000Z",
    updatedAt: "2026-06-28T00:00:00.000Z",
  },
  {
    id: "deal-10",
    title: "Forge Expansion",
    companyName: "Forge Co",
    amount: 61000,
    currency: "USD",
    stage: "closed-won",
    probability: 100,
    ownerId: "u10",
    status: "won",
    createdAt: "2026-05-01T00:00:00.000Z",
    updatedAt: "2026-06-20T00:00:00.000Z",
  },
  {
    id: "deal-11",
    title: "Pulse Pilot",
    companyName: "Pulse AI",
    amount: 45000,
    currency: "USD",
    stage: "closed-lost",
    probability: 0,
    ownerId: "u11",
    status: "lost",
    createdAt: "2026-04-20T00:00:00.000Z",
    updatedAt: "2026-06-21T00:00:00.000Z",
  },
  {
    id: "deal-12",
    title: "Crown Labs Upgrade",
    companyName: "Crown Lab",
    amount: 94000,
    currency: "USD",
    stage: "proposal",
    probability: 69,
    ownerId: "u12",
    status: "open",
    createdAt: "2026-05-25T00:00:00.000Z",
    updatedAt: "2026-06-24T00:00:00.000Z",
  },
  {
    id: "deal-13",
    title: "Vanta Compliance",
    companyName: "Vanta Net",
    amount: 102000,
    currency: "USD",
    stage: "negotiation",
    probability: 85,
    ownerId: "u13",
    status: "open",
    createdAt: "2026-05-05T00:00:00.000Z",
    updatedAt: "2026-06-26T00:00:00.000Z",
  },
  {
    id: "deal-14",
    title: "Solace CRM",
    companyName: "Solace Co",
    amount: 52000,
    currency: "USD",
    stage: "prospecting",
    probability: 33,
    ownerId: "u14",
    status: "open",
    createdAt: "2026-06-22T00:00:00.000Z",
    updatedAt: "2026-07-03T00:00:00.000Z",
  },
  {
    id: "deal-15",
    title: "Echelon Expansion",
    companyName: "Echelon IO",
    amount: 117000,
    currency: "USD",
    stage: "qualification",
    probability: 57,
    ownerId: "u15",
    status: "open",
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z",
  },
  {
    id: "deal-16",
    title: "Cobalt Secure",
    companyName: "Cobalt AI",
    amount: 69000,
    currency: "USD",
    stage: "proposal",
    probability: 74,
    ownerId: "u16",
    status: "open",
    createdAt: "2026-05-18T00:00:00.000Z",
    updatedAt: "2026-06-27T00:00:00.000Z",
  },
  {
    id: "deal-17",
    title: "Bright Labs Suite",
    companyName: "Bright Labs",
    amount: 83000,
    currency: "USD",
    stage: "negotiation",
    probability: 80,
    ownerId: "u17",
    status: "open",
    createdAt: "2026-05-22T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z",
  },
  {
    id: "deal-18",
    title: "Atlas Analytics",
    companyName: "Atlas IO",
    amount: 59000,
    currency: "USD",
    stage: "prospecting",
    probability: 29,
    ownerId: "u18",
    status: "open",
    createdAt: "2026-06-25T00:00:00.000Z",
    updatedAt: "2026-07-04T00:00:00.000Z",
  },
  {
    id: "deal-19",
    title: "Northstar Platform",
    companyName: "Northstar Labs",
    amount: 165000,
    currency: "USD",
    stage: "closed-won",
    probability: 100,
    ownerId: "u19",
    status: "won",
    createdAt: "2026-05-02T00:00:00.000Z",
    updatedAt: "2026-06-15T00:00:00.000Z",
  },
  {
    id: "deal-20",
    title: "Harbor Ops",
    companyName: "Harbor One",
    amount: 41000,
    currency: "USD",
    stage: "closed-lost",
    probability: 0,
    ownerId: "u20",
    status: "lost",
    createdAt: "2026-04-10T00:00:00.000Z",
    updatedAt: "2026-06-14T00:00:00.000Z",
  },
];

const ownerNameById: Record<string, string> = {
  u1: "Mina Chen",
  u2: "Theo Grant",
  u3: "Liam Ortiz",
  u4: "Nina Brooks",
  u5: "Riley Ford",
  u6: "Sage Chen",
  u7: "Alicia Gomez",
  u8: "Theo Grant",
  u9: "Mina Chen",
  u10: "Nina Brooks",
  u11: "Liam Ortiz",
  u12: "Sage Chen",
  u13: "Alicia Gomez",
  u14: "Theo Grant",
  u15: "Mina Chen",
  u16: "Riley Ford",
  u17: "Sage Chen",
  u18: "Alicia Gomez",
  u19: "Mina Chen",
  u20: "Theo Grant",
};

const stageConfig = [
  { key: "prospecting", label: "New", accent: "border-border" },
  { key: "qualification", label: "Qualified", accent: "border-border" },
  { key: "proposal", label: "Proposal", accent: "border-border" },
  { key: "negotiation", label: "Negotiation", accent: "border-amber-500/40" },
  { key: "closed-won", label: "Won", accent: "border-emerald-500/50" },
  { key: "closed-lost", label: "Lost", accent: "border-rose-500/50" },
] as const;

export function DealsPipelinePage() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const groupedDeals = useMemo(() => {
    return stageConfig.map((stage) => ({
      ...stage,
      deals: mockDeals.filter((deal) => deal.stage === stage.key),
    }));
  }, []);

  const openDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setShowDialog(true);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  const daysInStage = (deal: Deal) => {
    const start = new Date(deal.createdAt);
    const end = new Date();
    return Math.max(
      1,
      Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Deals Pipeline"
        description="Track your opportunities across the sales funnel"
        action={
          <Button type="button" onClick={() => undefined}>
            <Plus className="mr-2 size-4" />
            New Deal
          </Button>
        }
      />

      <div className="flex gap-4 overflow-x-auto pb-2">
        {groupedDeals.map((column) => {
          const totalValue = column.deals.reduce(
            (sum, deal) => sum + deal.amount,
            0,
          );
          const isClosed =
            column.key === "closed-won" || column.key === "closed-lost";
          return (
            <div
              key={column.key}
              className={`min-w-[300px] max-w-[300px] flex-1 rounded-xl border bg-card/70 p-3 shadow-sm dark:bg-card/50 ${column.accent}`}
            >
              <div
                className={`mb-3 border-b pb-3 ${isClosed ? "border-emerald-500/20" : "border-border/70"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {column.label}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {column.deals.length} deals
                    </p>
                  </div>
                  <Badge
                    variant={
                      column.key === "closed-won"
                        ? "default"
                        : column.key === "closed-lost"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {formatCurrency(totalValue)}
                  </Badge>
                </div>
              </div>
              <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-1">
                {column.deals.map((deal) => {
                  const ownerName =
                    ownerNameById[deal.ownerId ?? ""] ?? "Unassigned";
                  const stuck = daysInStage(deal) >= 12;
                  return (
                    <button
                      key={deal.id}
                      type="button"
                      onClick={() => openDeal(deal)}
                      className="w-full rounded-lg border border-border/70 bg-background/70 p-3 text-left shadow-sm transition hover:border-primary/40 hover:bg-background/90"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {deal.companyName ?? "Unknown company"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {deal.title}
                          </p>
                        </div>
                        <Badge
                          variant={stuck ? "outline" : "secondary"}
                          className={
                            stuck ? "border-amber-500/40 text-amber-600" : ""
                          }
                        >
                          {stuck
                            ? `${daysInStage(deal)}d`
                            : `${daysInStage(deal)}d`}
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-sm font-semibold text-foreground">
                          {formatCurrency(deal.amount)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Avatar size="sm">
                            <AvatarFallback>
                              {ownerName.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{ownerName}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedDeal?.title ?? "Deal details"}</DialogTitle>
          </DialogHeader>
          {selectedDeal ? (
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle className="text-base">
                  {selectedDeal.companyName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Value</span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(selectedDeal.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Stage</span>
                  <span className="font-medium text-foreground">
                    {selectedDeal.stage}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Owner</span>
                  <span className="flex items-center gap-2 font-medium text-foreground">
                    <UserCircle2 className="size-4" />
                    {ownerNameById[selectedDeal.ownerId ?? ""] ?? "Unassigned"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Probability</span>
                  <span className="font-medium text-foreground">
                    {selectedDeal.probability ?? 0}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Close date</span>
                  <span className="font-medium text-foreground">
                    {selectedDeal.closeDate
                      ? format(new Date(selectedDeal.closeDate), "MMM d, yyyy")
                      : "TBD"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
