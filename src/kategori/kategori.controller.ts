//src/kategori/kategori.controller.ts
// Controller untuk endpoint API kategori
// Menangani request HTTP untuk fitur kategori dengan respons standar { success, message } dan penanganan data null

import { Controller, Get } from '@nestjs/common';
import { KategoriService } from './kategori.service';
import { Kategori } from '../entities/kategori.entity';

@Controller('kategori')
export class KategoriController {
  constructor(
    // Injeksi service untuk logika bisnis
    private readonly kategoriService: KategoriService,
  ) {}

  // Endpoint GET /kategori untuk mengambil semua kategori
  @Get()
  async findAll(): Promise<{
    success: boolean;
    message: string;
    data: Kategori[];
  }> {
    try {
      const categories = await this.kategoriService.findAll();
      if (!categories || categories.length === 0) {
        return {
          success: false,
          message: 'Tidak ada data kategori ditemukan',
          data: [],
        };
      }
      return {
        success: true,
        message: 'Data kategori berhasil diambil',
        data: categories,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Gagal mengambil data kategori: ' + error.message,
        data: [],
      };
    }
  }
}
