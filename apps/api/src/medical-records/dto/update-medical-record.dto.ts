import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateMedicalRecordDto {
  @IsString()
  @IsOptional()
  allergies?: string;

  @IsString()
  @IsOptional()
  chronicDiseases?: string;

  @IsString()
  @IsOptional()
  disabilities?: string;

  @IsBoolean({ message: 'O campo de medicação contínua deve ser um booleano.' })
  @IsOptional()
  usesContinuousMedication?: boolean;

  @IsString()
  @IsOptional()
  currentMedications?: string;

  @IsString()
  @IsOptional()
  medicalHistory?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}