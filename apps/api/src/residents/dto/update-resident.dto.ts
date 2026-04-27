import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ResidentStatus } from '@prisma/client';

export class UpdateResidentDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsDateString({}, { message: 'A data de nascimento deve estar em formato ISO válido' })
  @IsOptional()
  birthDate?: string;

  @IsString()
  @IsOptional()
  documentId?: string;

  @IsEnum(ResidentStatus, { message: 'Status fornecido é inválido' })
  @IsOptional()
  status?: ResidentStatus;
}