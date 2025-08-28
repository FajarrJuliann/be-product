import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarangService } from './barang.service';
import { BarangController } from './barang.controller';
import { Barang } from '../entities/barang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barang])], // Tambahkan ini
  controllers: [BarangController],
  providers: [BarangService],
})
export class BarangModule {}
