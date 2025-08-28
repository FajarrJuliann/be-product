//src/kategori/kategori.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KategoriService } from './kategori.service';
import { KategoriController } from './kategori.controller';
import { Kategori } from '../entities/kategori.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kategori])], // Tambahkan ini
  controllers: [KategoriController],
  providers: [KategoriService],
})
export class KategoriModule {}
