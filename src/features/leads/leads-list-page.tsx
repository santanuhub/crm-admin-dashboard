import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import type { Lead } from "@/types";
import { getLeadColumns } from "./leads-columns";
import { LeadForm, type LeadFormValues } from "./lead-form";

export const mockLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Ava Martinez",
    email: "ava.martinez@northstar.io",
    phone: "(555) 111-2233",
    company: "Northstar Labs",
    status: "qualified",
    source: "Website",
    assignedTo: "Nina Brooks",
    createdAt: "2026-06-01T09:30:00.000Z",
    updatedAt: "2026-06-20T10:00:00.000Z",
    notes: "Interested in enterprise plan",
  },
  {
    id: "lead-2",
    name: "Marcus Lee",
    email: "marcus.lee@brightlabs.com",
    phone: "(555) 222-3344",
    company: "Bright Labs",
    status: "contacted",
    source: "Referral",
    assignedTo: "Theo Grant",
    createdAt: "2026-06-03T13:10:00.000Z",
    updatedAt: "2026-06-22T15:25:00.000Z",
    notes: "Prefers email follow-ups",
  },
  {
    id: "lead-3",
    name: "Sofia Patel",
    email: "sofia.patel@pulse.ai",
    phone: "(555) 333-4455",
    company: "Pulse AI",
    status: "new",
    source: "Social",
    assignedTo: "Mina Chen",
    createdAt: "2026-06-07T11:40:00.000Z",
    updatedAt: "2026-06-21T09:15:00.000Z",
    notes: "Wants a live demo",
  },
  {
    id: "lead-4",
    name: "Ethan Brooks",
    email: "ethan.brooks@summit.co",
    phone: "(555) 444-5566",
    company: "Summit Co",
    status: "lost",
    source: "Cold Outreach",
    assignedTo: "Liam Ortiz",
    createdAt: "2026-05-28T16:20:00.000Z",
    updatedAt: "2026-06-18T14:00:00.000Z",
    notes: "Budget constraints",
  },
  {
    id: "lead-5",
    name: "Jules Carter",
    email: "jules.carter@harbor.one",
    phone: "(555) 555-6677",
    company: "Harbor One",
    status: "qualified",
    source: "Website",
    assignedTo: "Alicia Gomez",
    createdAt: "2026-05-30T08:50:00.000Z",
    updatedAt: "2026-06-19T12:35:00.000Z",
    notes: "Requested implementation support",
  },
  {
    id: "lead-6",
    name: "Nadia Singh",
    email: "nadia.singh@lumenx.net",
    phone: "(555) 666-7788",
    company: "LumenX",
    status: "contacted",
    source: "Referral",
    assignedTo: "Drew Kim",
    createdAt: "2026-06-11T10:05:00.000Z",
    updatedAt: "2026-06-24T08:45:00.000Z",
    notes: "Follow-up next week",
  },
  {
    id: "lead-7",
    name: "Owen Price",
    email: "owen.price@atlas.io",
    phone: "(555) 777-8899",
    company: "Atlas IO",
    status: "new",
    source: "Social",
    assignedTo: "Tessa Brown",
    createdAt: "2026-06-12T12:20:00.000Z",
    updatedAt: "2026-06-23T13:50:00.000Z",
    notes: "Interested in analytics",
  },
  {
    id: "lead-8",
    name: "Maya Thompson",
    email: "maya.thompson@meridian.ai",
    phone: "(555) 888-9900",
    company: "Meridian AI",
    status: "qualified",
    source: "Website",
    assignedTo: "Riley Ford",
    createdAt: "2026-06-14T09:45:00.000Z",
    updatedAt: "2026-06-25T11:10:00.000Z",
    notes: "Ready for onboarding",
  },
  {
    id: "lead-9",
    name: "Caleb Ortiz",
    email: "caleb.ortiz@forge.co",
    phone: "(555) 999-0011",
    company: "Forge Co",
    status: "contacted",
    source: "Cold Outreach",
    assignedTo: "Sage Chen",
    createdAt: "2026-06-15T15:30:00.000Z",
    updatedAt: "2026-06-26T14:40:00.000Z",
    notes: "Needs pricing details",
  },
  {
    id: "lead-10",
    name: "Isabella Cruz",
    email: "isabella.cruz@voyage.dev",
    phone: "(555) 101-1122",
    company: "Voyage Dev",
    status: "new",
    source: "Website",
    assignedTo: "Nina Brooks",
    createdAt: "2026-06-16T07:20:00.000Z",
    updatedAt: "2026-06-27T09:25:00.000Z",
    notes: "Exploring alternatives",
  },
  {
    id: "lead-11",
    name: "Declan Reed",
    email: "declan.reed@crownlab.com",
    phone: "(555) 202-3033",
    company: "Crown Lab",
    status: "qualified",
    source: "Referral",
    assignedTo: "Theo Grant",
    createdAt: "2026-06-17T14:10:00.000Z",
    updatedAt: "2026-06-28T10:15:00.000Z",
    notes: "Wants team training",
  },
  {
    id: "lead-12",
    name: "Priya Shah",
    email: "priya.shah@echelon.io",
    phone: "(555) 303-4044",
    company: "Echelon IO",
    status: "contacted",
    source: "Social",
    assignedTo: "Mina Chen",
    createdAt: "2026-06-18T12:35:00.000Z",
    updatedAt: "2026-06-29T16:00:00.000Z",
    notes: "Looking for integration support",
  },
  {
    id: "lead-13",
    name: "Logan Ward",
    email: "logan.ward@cobalt.ai",
    phone: "(555) 404-5055",
    company: "Cobalt AI",
    status: "new",
    source: "Cold Outreach",
    assignedTo: "Liam Ortiz",
    createdAt: "2026-06-19T10:25:00.000Z",
    updatedAt: "2026-06-30T11:30:00.000Z",
    notes: "Potential yearly contract",
  },
  {
    id: "lead-14",
    name: "Elena Park",
    email: "elena.park@solace.co",
    phone: "(555) 505-6066",
    company: "Solace Co",
    status: "qualified",
    source: "Website",
    assignedTo: "Alicia Gomez",
    createdAt: "2026-06-20T08:40:00.000Z",
    updatedAt: "2026-07-01T13:45:00.000Z",
    notes: "Interested in automation",
  },
  {
    id: "lead-15",
    name: "Henry Cole",
    email: "henry.cole@vanta.net",
    phone: "(555) 606-7077",
    company: "Vanta Net",
    status: "contacted",
    source: "Referral",
    assignedTo: "Sage Chen",
    createdAt: "2026-06-21T09:55:00.000Z",
    updatedAt: "2026-07-02T12:20:00.000Z",
    notes: "Requested pricing sheet",
  },
];

export function LeadsListPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [pendingEditLead, setPendingEditLead] = useState<Lead | null>(null);
  const [pendingDeleteLead, setPendingDeleteLead] = useState<Lead | null>(null);
  const [pendingBulkDelete, setPendingBulkDelete] = useState<Lead[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateSubmit = (values: LeadFormValues) => {
    setIsSubmitting(true);
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: values.name,
      email: values.email,
      phone: values.phone,
      company: values.company,
      status: values.status,
      source: values.source,
      createdAt: new Date().toISOString(),
      notes: values.notes,
    };
    setLeads((current) => [newLead, ...current]);
    setShowCreateDialog(false);
    toast.success("Lead created");
    setIsSubmitting(false);
  };

  const handleEditSubmit = (values: LeadFormValues) => {
    if (!pendingEditLead) {
      return;
    }
    setIsSubmitting(true);
    setLeads((current) =>
      current.map((lead) =>
        lead.id === pendingEditLead.id ? { ...lead, ...values } : lead,
      ),
    );
    setShowEditDialog(false);
    setPendingEditLead(null);
    toast.success("Lead updated");
    setIsSubmitting(false);
  };

  const handleDelete = (lead: Lead) => {
    setLeads((current) => current.filter((item) => item.id !== lead.id));
    toast.success("Lead deleted");
  };

  const handleBulkDelete = (selectedRows: Lead[]) => {
    if (selectedRows.length === 0) {
      return;
    }
    setPendingBulkDelete(selectedRows);
  };

  const confirmBulkDelete = () => {
    if (pendingBulkDelete.length === 0) {
      return;
    }
    const ids = new Set(pendingBulkDelete.map((lead) => lead.id));
    setLeads((current) => current.filter((lead) => !ids.has(lead.id)));
    setPendingBulkDelete([]);
    toast.success(`${pendingBulkDelete.length} leads deleted`);
  };

  const columns = useMemo(
    () =>
      getLeadColumns((rows) => {
        setPendingDeleteLead(rows[0] ?? null);
      }),
    [],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        description="Manage and track your sales leads"
        action={
          <Button type="button" onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 size-4" />
            New Lead
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={leads}
        searchPlaceholder="Search leads..."
        onRowClick={(row) => navigate(`/leads/${row.id}`)}
        onBulkDelete={handleBulkDelete}
        emptyStateProps={{
          icon: Search,
          title: "No leads found",
          description:
            "Try adjusting your search or add a new lead to get started.",
          actionLabel: "Create lead",
          onAction: () => setShowCreateDialog(true),
        }}
      />

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Lead</DialogTitle>
          </DialogHeader>
          <LeadForm onSubmit={handleCreateSubmit} isSubmitting={isSubmitting} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={showEditDialog}
        onOpenChange={(open) => {
          setShowEditDialog(open);
          if (!open) {
            setPendingEditLead(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
          </DialogHeader>
          {pendingEditLead ? (
            <LeadForm
              defaultValues={{
                ...pendingEditLead,
                status: pendingEditLead.status as LeadFormValues["status"],
                source: pendingEditLead.source as LeadFormValues["source"],
              }}
              onSubmit={handleEditSubmit}
              isSubmitting={isSubmitting}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(pendingDeleteLead)}
        onOpenChange={(open) => {
          if (!open) {
            setPendingDeleteLead(null);
          }
        }}
        title="Delete lead"
        description={`Delete ${pendingDeleteLead?.name ?? "this lead"} from your leads list?`}
        onConfirm={() => {
          if (pendingDeleteLead) {
            handleDelete(pendingDeleteLead);
          }
          setPendingDeleteLead(null);
        }}
      />

      <ConfirmDialog
        open={pendingBulkDelete.length > 0}
        onOpenChange={(open) => {
          if (!open) {
            setPendingBulkDelete([]);
          }
        }}
        title="Delete selected leads"
        description={`Delete ${pendingBulkDelete.length} selected leads?`}
        onConfirm={() => {
          confirmBulkDelete();
        }}
      />
    </div>
  );
}
