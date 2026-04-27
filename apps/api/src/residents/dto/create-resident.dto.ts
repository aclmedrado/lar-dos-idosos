import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResidentDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome completo é obrigatório' })
  fullName: string;

  @IsDateString({}, { message: 'A data de nascimento deve estar em formato ISO válido' })
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  birthDate: string;

  @IsString()
  @IsOptional()
  documentId?: string;
}