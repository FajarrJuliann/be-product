//src/kategori/kategori.service.ts
// Service untuk logika bisnis kategori
// Menangani operasi database untuk tabel kategori dengan penanganan data null

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kategori } from '../entities/kategori.entity';

@Injectable()
export class KategoriService {
  constructor(
    // Injeksi repository Kategori untuk akses database
    @InjectRepository(Kategori)
    private kategoriRepository: Repository<Kategori>,
  ) {}

  // Mengambil semua data kategori dari database
  // Mengembalikan array kosong jika tidak ada data
  async findAll(): Promise<Kategori[]> {
    const categories = await this.kategoriRepository.find();
    return categories ?? []; // Kembalikan array kosong jika null
  }
}
