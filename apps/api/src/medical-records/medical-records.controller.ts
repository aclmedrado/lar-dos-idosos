import { Controller, Get, Post, Body, Patch, Param, ParseUUIDPipe } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';

@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Get()
  findAll() {
    return this.medicalRecordsService.findAll();
  }

  @Get('resident/:residentId')
  findByResident(@Param('residentId', new ParseUUIDPipe()) residentId: string) {
    return this.medicalRecordsService.findByResident(residentId);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.medicalRecordsService.findOne(id);
  }

  @Post()
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(createMedicalRecordDto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
  ) {
    return this.medicalRecordsService.update(id, updateMedicalRecordDto);
  }
}