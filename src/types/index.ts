export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: "new" | "contacted" | "qualified" | "won" | "lost";
  source?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  companyId?: string;
  companyName?: string;
  status: "active" | "inactive" | "prospect";
  createdAt: string;
  updatedAt?: string;
}

export interface Company {
  id: string;
  name: string;
  industry?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  status: "active" | "lead" | "inactive";
  createdAt: string;
  updatedAt?: string;
}

export interface Deal {
  id: string;
  title: string;
  companyId?: string;
  companyName?: string;
  amount: number;
  currency: string;
  stage:
    | "prospecting"
    | "qualification"
    | "proposal"
    | "negotiation"
    | "closed-won"
    | "closed-lost";
  closeDate?: string;
  probability?: number;
  ownerId?: string;
  status: "open" | "won" | "lost";
  createdAt: string;
  updatedAt?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
  assigneeId?: string;
  relatedEntityType?: "lead" | "contact" | "company" | "deal";
  relatedEntityId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "sales" | "support";
  avatarUrl?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}
