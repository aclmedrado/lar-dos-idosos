import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma.module';
import { ResidentsModule } from './residents/residents.module';
import { EmployeesModule } from './employees/employees.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module';

@Module({
  imports: [
    PrismaModule, 
    ResidentsModule, 
    EmployeesModule,
    MedicalRecordsModule // <-- NOVO MÓDULO ADICIONADO
  ],
  controllers: [AppController],
})
export class AppModule {}