import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Edit3, FileText, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LeadForm, type LeadFormValues } from "./lead-form";
import { mockLeads } from "./leads-list-page";

type ActivityItem = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
};

const activitySeed: ActivityItem[] = [
  {
    id: 1,
    title: "Lead created",
    description: "New lead assigned to the sales team.",
    createdAt: "2026-07-01T08:00:00.000Z",
  },
  {
    id: 2,
    title: "Follow-up call",
    description: "Spoke with the prospect about pricing.",
    createdAt: "2026-07-02T10:30:00.000Z",
  },
  {
    id: 3,
    title: "Proposal sent",
    description: "Shared a detailed proposal with the contact.",
    createdAt: "2026-07-03T11:15:00.000Z",
  },
];

export function LeadDetailPage() {
  const { leadId } = useParams<{ leadId: string }>();
  const navigate = useNavigate();
  const lead = mockLeads.find((item) => item.id === leadId) ?? null;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [notes, setNotes] = useState<string[]>([
    "Discussed budget target during the last call.",
    "Interested in a 6-month rollout plan.",
  ]);
  const [draftNote, setDraftNote] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const activity = useMemo(
    () => activitySeed.filter((item) => item.title !== ""),
    [],
  );

  const handleAddNote = () => {
    if (!draftNote.trim()) {
      return;
    }

    setNotes((current) => [
      `${new Date().toISOString()}::${draftNote.trim()}`,
      ...current,
    ]);
    setDraftNote("");
    toast.success("Note added");
  };

  const handleSubmit = () => {
    if (!lead) {
      return;
    }
    setShowEditDialog(false);
    toast.success("Lead updated");
  };

  if (!lead) {
    return (
      <div className="space-y-6">
        <EmptyState
          icon={FileText}
          title="Lead not found"
          description="The requested lead could not be found."
          actionLabel="Back to leads"
          onAction={() => navigate("/leads")}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl border border-border/70 bg-card/70 p-4 shadow-sm md:flex-row md:items-start md:justify-between md:p-6 dark:bg-card/50">
        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            aria-label="Go back to leads list"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back
          </Button>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarFallback>
                  {lead.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {lead.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {lead.company ?? "Independent lead"}
                </p>
              </div>
            </div>
            <Badge>{lead.status}</Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowEditDialog(true)}
            aria-label="Edit lead"
          >
            <Edit3 className="mr-2 size-4" />
            Edit
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
            aria-label="Delete lead"
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/70 bg-card/80 shadow-sm">
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium text-foreground">{lead.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium text-foreground">
                {lead.phone ?? "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Company</span>
              <span className="font-medium text-foreground">
                {lead.company ?? "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Source</span>
              <span className="font-medium text-foreground">
                {lead.source ?? "—"}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-card/80 shadow-sm">
          <CardHeader>
            <CardTitle>Lead Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium text-foreground">
                {format(new Date(lead.createdAt), "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Assigned</span>
              <span className="font-medium text-foreground">
                {lead.assignedTo ?? "Unassigned"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last Update</span>
              <span className="font-medium text-foreground">
                {lead.updatedAt
                  ? format(new Date(lead.updatedAt), "MMM d, yyyy")
                  : "—"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/70 bg-card/80 shadow-sm">
        <CardHeader>
          <CardTitle>Activity & Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>

            <TabsContent
              value="overview"
              className="mt-4 grid gap-4 md:grid-cols-2"
            >
              <div className="space-y-3 rounded-lg border border-border/60 bg-background/60 p-4 dark:bg-background/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge>{lead.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Company</span>
                  <span className="text-sm font-medium text-foreground">
                    {lead.company ?? "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Source</span>
                  <span className="text-sm font-medium text-foreground">
                    {lead.source ?? "—"}
                  </span>
                </div>
              </div>
              <div className="space-y-3 rounded-lg border border-border/60 bg-background/60 p-4 dark:bg-background/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm font-medium text-foreground">
                    {lead.email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Phone</span>
                  <span className="text-sm font-medium text-foreground">
                    {lead.phone ?? "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Assigned
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {lead.assignedTo ?? "Unassigned"}
                  </span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-4">
              <ScrollArea className="h-[280px] pr-4">
                <div className="space-y-3">
                  {activity.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/60 p-3 dark:bg-background/30"
                    >
                      <div className="rounded-full bg-muted p-2 text-muted-foreground">
                        <FileText className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {item.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {format(new Date(item.createdAt), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="notes" className="mt-4 space-y-4">
              <Textarea
                value={draftNote}
                onChange={(event) => setDraftNote(event.target.value)}
                placeholder="Add a note about this lead"
                rows={4}
              />
              <div className="flex justify-end">
                <Button type="button" onClick={handleAddNote}>
                  Add Note
                </Button>
              </div>
              <div className="space-y-3">
                {notes.map((note, index) => {
                  const [timestamp, content] = note.split("::");
                  return (
                    <div
                      key={`${note}-${index}`}
                      className="rounded-lg border border-border/60 bg-background/60 p-3 dark:bg-background/30"
                    >
                      <p className="text-sm text-foreground">
                        {content ?? note}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {timestamp && timestamp !== note
                          ? format(new Date(timestamp), "MMM d, yyyy")
                          : "Added recently"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="files" className="mt-4">
              <EmptyState
                icon={UploadCloud}
                title="No files uploaded yet"
                description="Attach documents or proposals for this lead when you are ready."
                actionLabel="Upload File"
                onAction={() => undefined}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete lead"
        description={`Delete ${lead.name} from your leads list? This action cannot be undone.`}
        onConfirm={() => {
          setShowDeleteDialog(false);
          navigate("/leads");
          toast.success("Lead deleted");
        }}
      />

      <ConfirmDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        title="Edit lead"
        description="Update the lead details below."
        onConfirm={() => undefined}
        confirmLabel="Save"
        variant="default"
      >
        <LeadForm
          defaultValues={{
            ...lead,
            status: lead.status as LeadFormValues["status"],
            source: lead.source as LeadFormValues["source"],
          }}
          onSubmit={handleSubmit}
        />
      </ConfirmDialog>
    </div>
  );
}
