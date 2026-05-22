import type { BadgeStatus } from '@/components/ui/badge';

export interface MedicalRecord {
  id: string;
  residentId: string;
  allergies?: string | null;
  chronicDiseases?: string | null;
  disabilities?: string | null;
  usesContinuousMedication: boolean;
  currentMedications?: string | null;
  medicalHistory?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  resident?: {
    id: string;
    fullName: string;
    status: BadgeStatus;
  };
}

export interface CreateMedicalRecordInput {
  residentId: string;
  allergies?: string;
  chronicDiseases?: string;
  disabilities?: string;
  usesContinuousMedication?: boolean;
  currentMedications?: string;
  medicalHistory?: string;
  notes?: string;
}

export interface UpdateMedicalRecordInput {
  allergies?: string;
  chronicDiseases?: string;
  disabilities?: string;
  usesContinuousMedication?: boolean;
  currentMedications?: string;
  medicalHistory?: string;
  notes?: string;
}
