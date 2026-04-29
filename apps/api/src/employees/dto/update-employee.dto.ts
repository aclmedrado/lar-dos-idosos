import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { EmployeeStatus } from '@prisma/client';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  documentId?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail({}, { message: 'Formato de e-mail inválido' })
  @IsOptional()
  email?: string;

  @IsEnum(EmployeeStatus, { message: 'Status fornecido é inválido' })
  @IsOptional()
  status?: EmployeeStatus;
}