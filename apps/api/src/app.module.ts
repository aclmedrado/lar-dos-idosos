import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma.module';
import { ResidentsModule } from './residents/residents.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [PrismaModule, ResidentsModule, EmployeesModule],
  controllers: [AppController],
})
export class AppModule {}