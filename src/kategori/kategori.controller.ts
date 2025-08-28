import { Controller, Get } from '@nestjs/common';
import { KategoriService } from './kategori.service';
import { Kategori } from '../entities/kategori.entity';
import { ApiResponse } from '../common/response.dto';

@Controller('kategori')
export class KategoriController {
  constructor(private readonly kategoriService: KategoriService) {}

  @Get()
  async findAll(): Promise<ApiResponse<Kategori[]>> {
    try {
      const kategori = await this.kategoriService.findAll();
      return {
        success: true,
        message: 'Kategori retrieved successfully',
        data: kategori,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to retrieve kategori',
      };
    }
  }
}
