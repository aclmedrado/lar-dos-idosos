import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsUUID('4', { message: 'O ID do residente deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'O ID do residente é obrigatório.' })
  residentId: string;

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