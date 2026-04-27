import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { Prisma, ResidentStatus } from '@prisma/client';

@Injectable()
export class ResidentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createResidentDto: CreateResidentDto) {
    if (createResidentDto.documentId) {
      const existing = await this.prisma.resident.findUnique({
        where: { documentId: createResidentDto.documentId },
      });
      if (existing) {
        throw new ConflictException('Já existe um residente cadastrado com este documento.');
      }
    }

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
      throw new NotFoundException(`Residente com ID ${id} não encontrado.`);
    }
    
    return resident;
  }

  async update(id: string, updateResidentDto: UpdateResidentDto) {
    await this.findOne(id); 

    if (updateResidentDto.documentId) {
      const existing = await this.prisma.resident.findUnique({
        where: { documentId: updateResidentDto.documentId },
      });
      
      if (existing && existing.id !== id) {
        throw new ConflictException('Este documento já pertence a outro residente.');
      }
    }

    // Montagem tipada do objeto de atualização
    const dataToUpdate: Prisma.ResidentUpdateInput = {};
    
    if (updateResidentDto.fullName) dataToUpdate.fullName = updateResidentDto.fullName;
    if (updateResidentDto.documentId) dataToUpdate.documentId = updateResidentDto.documentId;
    if (updateResidentDto.status) dataToUpdate.status = updateResidentDto.status;
    if (updateResidentDto.birthDate) {
      dataToUpdate.birthDate = new Date(updateResidentDto.birthDate);
    }

    return this.prisma.resident.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.resident.update({
      where: { id },
      data: { status: ResidentStatus.INACTIVE },
    });
  }
}