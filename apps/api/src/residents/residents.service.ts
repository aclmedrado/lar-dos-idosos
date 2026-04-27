import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateResidentDto } from './dto/create-resident.dto';

@Injectable()
export class ResidentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createResidentDto: CreateResidentDto) {
    return this.prisma.resident.create({
      data: {
        fullName: createResidentDto.fullName,
        birthDate: new Date(createResidentDto.birthDate),
        documentId: createResidentDto.documentId,
      },
    });
  }

  async findAll() {
    return this.prisma.resident.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const resident = await this.prisma.resident.findUnique({
      where: { id },
    });
    
    if (!resident) {
      throw new NotFoundException(`Residente com ID ${id} não encontrado`);
    }
    
    return resident;
  }
}