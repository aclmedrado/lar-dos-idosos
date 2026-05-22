import type { BadgeStatus } from '@/components/ui/badge';

export interface Employee {
  id: string;
  fullName: string;
  role: string;
  documentId?: string | null;
  phone?: string | null;
  email?: string | null;
  status: BadgeStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmployeeInput {
  fullName: string;
  role: string;
  documentId?: string;
  phone?: string;
  email?: string;
}

export interface UpdateEmployeeInput {
  fullName?: string;
  role?: string;
  documentId?: string;
  phone?: string;
  email?: string;
  status?: BadgeStatus;
}
