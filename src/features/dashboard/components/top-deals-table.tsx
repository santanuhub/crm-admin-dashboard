import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const deals = [
  {
    id: 1,
    name: "Northwind Renewal",
    company: "Northwind",
    value: "$48k",
    stage: "Negotiation",
    owner: "Sarah Chen",
  },
  {
    id: 2,
    name: "Apex Expansion",
    company: "Apex Labs",
    value: "$32k",
    stage: "Proposal",
    owner: "Mina Patel",
  },
  {
    id: 3,
    name: "BluePeak Upgrade",
    company: "BluePeak",
    value: "$24k",
    stage: "Qualification",
    owner: "Elliot Brooks",
  },
  {
    id: 4,
    name: "Summit Analytics",
    company: "Summit",
    value: "$19k",
    stage: "Closed Won",
    owner: "Nora Kim",
  },
  {
    id: 5,
    name: "Helio Integration",
    company: "Helio",
    value: "$15k",
    stage: "Prospecting",
    owner: "Jordan Lee",
  },
];

const stageVariantMap: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  Negotiation: "default",
  Proposal: "secondary",
  Qualification: "outline",
  "Closed Won": "destructive",
  Prospecting: "secondary",
};

export function TopDealsTable() {
  return (
    <Card className="border-border/70 bg-card/80 shadow-sm">
      <CardHeader>
        <CardTitle>Top Deals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium text-foreground">
                    {deal.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {deal.company}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {deal.value}
                  </TableCell>
                  <TableCell>
                    <Badge variant={stageVariantMap[deal.stage] ?? "outline"}>
                      {deal.stage}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback>
                          {deal.owner
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-foreground">
                        {deal.owner}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
