import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Prisma, EmployeeStatus } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    if (createEmployeeDto.documentId) {
      const existing = await this.prisma.employee.findUnique({
        where: { documentId: createEmployeeDto.documentId },
      });
      if (existing) {
        throw new ConflictException('Já existe um funcionário cadastrado com este documento.');
      }
    }

    return this.prisma.employee.create({
      data: {
        fullName: createEmployeeDto.fullName,
        role: createEmployeeDto.role,
        documentId: createEmployeeDto.documentId,
        phone: createEmployeeDto.phone,
        email: createEmployeeDto.email,
      },
    });
  }

  async findAll() {
    return this.prisma.employee.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });
    
    if (!employee) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado.`);
    }
    
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    await this.findOne(id); 

    if (updateEmployeeDto.documentId) {
      const existing = await this.prisma.employee.findUnique({
        where: { documentId: updateEmployeeDto.documentId },
      });
      
      if (existing && existing.id !== id) {
        throw new ConflictException('Este documento já pertence a outro funcionário.');
      }
    }

    // Montagem tipada para evitar o uso de "any"
    const dataToUpdate: Prisma.EmployeeUpdateInput = {};
    
    if (updateEmployeeDto.fullName !== undefined) dataToUpdate.fullName = updateEmployeeDto.fullName;
    if (updateEmployeeDto.role !== undefined) dataToUpdate.role = updateEmployeeDto.role;
    if (updateEmployeeDto.documentId !== undefined) dataToUpdate.documentId = updateEmployeeDto.documentId;
    if (updateEmployeeDto.phone !== undefined) dataToUpdate.phone = updateEmployeeDto.phone;
    if (updateEmployeeDto.email !== undefined) dataToUpdate.email = updateEmployeeDto.email;
    if (updateEmployeeDto.status !== undefined) dataToUpdate.status = updateEmployeeDto.status;

    return this.prisma.employee.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.employee.update({
      where: { id },
      data: { status: EmployeeStatus.INACTIVE },
    });
  }
}