import type { BadgeStatus } from '@/components/ui/badge';

export interface Resident {
  id: string;
  fullName: string;
  birthDate: string;
  documentId?: string | null;
  status: BadgeStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateResidentInput {
  fullName: string;
  birthDate: string;
  documentId?: string;
}

export interface UpdateResidentInput {
  fullName?: string;
  birthDate?: string;
  documentId?: string;
}
