import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';

@Injectable()
export class MedicalRecordsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMedicalRecordDto) {
    const resident = await this.prisma.resident.findUnique({
      where: { id: dto.residentId },
    });

    if (!resident) {
      throw new NotFoundException('Residente não encontrado.');
    }

    const existingRecord = await this.prisma.medicalRecord.findUnique({
      where: { residentId: dto.residentId },
    });

    if (existingRecord) {
      throw new ConflictException('Este residente já possui um prontuário médico.');
    }

    return this.prisma.medicalRecord.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.medicalRecord.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        resident: {
          select: { id: true, fullName: true, status: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const record = await this.prisma.medicalRecord.findUnique({
      where: { id },
      include: {
        resident: {
          select: { id: true, fullName: true, status: true },
        },
      },
    });

    if (!record) {
      throw new NotFoundException('Prontuário médico não encontrado.');
    }

    return record;
  }

  async findByResident(residentId: string) {
    const resident = await this.prisma.resident.findUnique({
      where: { id: residentId },
    });

    if (!resident) {
      throw new NotFoundException('Residente não encontrado.');
    }

    const record = await this.prisma.medicalRecord.findUnique({
      where: { residentId },
      include: {
        resident: {
          select: { id: true, fullName: true, status: true },
        },
      },
    });

    if (!record) {
      throw new NotFoundException('Prontuário não encontrado para este residente.');
    }

    return record;
  }

  async update(id: string, dto: UpdateMedicalRecordDto) {
    await this.findOne(id); // Garante que o prontuário existe, ou lança 404

    return this.prisma.medicalRecord.update({
      where: { id },
      data: dto,
    });
  }
}