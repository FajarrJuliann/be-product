//src/barang/barang.module.ts
// Modul untuk fitur barang
// Mengatur controller dan service untuk barang

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarangService } from './barang.service';
import { BarangController } from './barang.controller';
import { Barang } from '../entities/barang.entity';
import { CustomLoggerService } from '../common/logger.service';

@Module({
  // Mengimpor repository Barang untuk operasi database
  imports: [TypeOrmModule.forFeature([Barang])],
  // Controller untuk menangani request HTTP
  controllers: [BarangController],
  // Service untuk logika bisnis
  providers: [BarangService, CustomLoggerService],
})
export class BarangModule {}
