import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { BarangService } from './barang.service';
import { Barang } from '../entities/barang.entity';

@Controller('barang')
export class BarangController {
  constructor(private readonly barangService: BarangService) {}

  @Get()
  async findAll(@Query('search') search: string): Promise<{
    success: boolean;
    message: string;
    count_data: number;
    data: Barang[];
  }> {
    try {
      const { count_data, data } = await this.barangService.findAll(search);
      if (!data || data.length === 0) {
        return {
          success: false,
          message: search
            ? 'Tidak ada barang yang cocok dengan pencarian'
            : 'Tidak ada data barang ditemukan',
          count_data: 0,
          data: [],
        };
      }
      return {
        success: true,
        message: search
          ? 'Hasil pencarian berhasil diambil'
          : 'Data barang berhasil diambil',
        count_data,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: `Gagal ${search ? 'melakukan pencarian' : 'mengambil data barang'}: ${error.message}`,
        count_data: 0,
        data: [],
      };
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<{ success: boolean; message: string; data: Barang | null }> {
    try {
      const parsedId = +id;
      if (isNaN(parsedId)) {
        throw new BadRequestException('ID barang tidak valid');
      }
      const barang = await this.barangService.findOne(parsedId);
      if (!barang) {
        return {
          success: false,
          message: `Barang dengan ID ${id} tidak ditemukan`,
          data: null,
        };
      }
      return {
        success: true,
        message: 'Detail barang berhasil diambil',
        data: barang,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Gagal mengambil detail barang: ' + error.message,
        data: null,
      };
    }
  }

  @Post()
  async create(
    @Body() barang: Barang,
  ): Promise<{ success: boolean; message: string; data: Barang | null }> {
    try {
      if (!barang) {
        throw new BadRequestException('Data barang tidak boleh kosong');
      }
      const newBarang = await this.barangService.create(barang);
      return {
        success: true,
        message: 'Barang berhasil ditambahkan',
        data: newBarang,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Gagal menambahkan barang: ' + error.message,
        data: null,
      };
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() barang: Barang,
  ): Promise<{ success: boolean; message: string; data: Barang | null }> {
    try {
      const parsedId = +id;
      if (isNaN(parsedId)) {
        throw new BadRequestException('ID barang tidak valid');
      }
      if (!barang) {
        throw new BadRequestException('Data barang tidak boleh kosong');
      }
      const updatedBarang = await this.barangService.update(parsedId, barang);
      return {
        success: true,
        message: 'Barang berhasil diperbarui',
        data: updatedBarang,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Gagal memperbarui barang: ' + error.message,
        data: null,
      };
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const parsedId = +id;
      if (isNaN(parsedId)) {
        throw new BadRequestException('ID barang tidak valid');
      }
      await this.barangService.remove(parsedId);
      return {
        success: true,
        message: `Barang dengan ID ${id} berhasil dihapus`,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Gagal menghapus barang: ' + error.message,
      };
    }
  }

  @Delete()
  async removeBulk(
    @Query('ids') ids: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      if (!ids) {
        throw new BadRequestException('Daftar ID barang tidak boleh kosong');
      }
      const idArray = ids
        .split(',')
        .map((id) => +id)
        .filter((id) => !isNaN(id));
      if (idArray.length === 0) {
        throw new BadRequestException('Daftar ID barang tidak valid');
      }
      await this.barangService.removeBulk(idArray);
      return {
        success: true,
        message: 'Barang berhasil dihapus secara bulk',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Gagal menghapus barang secara bulk: ' + error.message,
      };
    }
  }
}
