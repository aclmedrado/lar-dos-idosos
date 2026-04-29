import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome completo é obrigatório' })
  fullName: string;

  @IsString()
  @IsNotEmpty({ message: 'O cargo (role) é obrigatório' })
  role: string;

  @IsString()
  @IsOptional()
  documentId?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail({}, { message: 'Formato de e-mail inválido' })
  @IsOptional()
  email?: string;
}