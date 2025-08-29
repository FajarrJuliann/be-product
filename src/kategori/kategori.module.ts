//src/kategori/kategori.module.ts
// Modul untuk fitur kategori
// Mengatur controller dan service untuk kategori

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KategoriService } from './kategori.service';
import { KategoriController } from './kategori.controller';
import { Kategori } from '../entities/kategori.entity';

@Module({
  // Mengimpor repository Kategori untuk operasi database
  imports: [TypeOrmModule.forFeature([Kategori])],
  // Controller untuk menangani request HTTP
  controllers: [KategoriController],
  // Service untuk logika bisnis
  providers: [KategoriService],
})
export class KategoriModule {}
