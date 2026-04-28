export interface Resident {
  id: string;
  fullName: string;
  birthDate: string;
  documentId?: string | null;
  status: string;
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