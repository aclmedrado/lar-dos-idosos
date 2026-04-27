import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { ResidentsModule } from './residents/residents.module';

@Module({
  imports: [ResidentsModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}