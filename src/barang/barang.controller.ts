import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { BarangService } from './barang.service';
import { Barang } from '../entities/barang.entity';
import { ApiResponse } from '../common/response.dto';

@Controller('barang')
export class BarangController {
  constructor(private readonly barangService: BarangService) {}

  @Get()
  async findAll(): Promise<ApiResponse<Barang[]>> {
    try {
      const barang = await this.barangService.findAll();
      return {
        success: true,
        message: 'Barang retrieved successfully',
        data: barang,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to retrieve barang',
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<Barang>> {
    try {
      const barang = await this.barangService.findOne(+id);
      if (!barang) {
        throw new NotFoundException(`Barang with ID ${id} not found`);
      }
      return {
        success: true,
        message: 'Barang retrieved successfully',
        data: barang,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to retrieve barang',
      };
    }
  }

  @Post()
  async create(@Body() barang: Barang): Promise<ApiResponse<Barang>> {
    try {
      const newBarang = await this.barangService.create(barang);
      return {
        success: true,
        message: 'Barang created successfully',
        data: newBarang,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to create barang',
      };
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() barang: Barang,
  ): Promise<ApiResponse<Barang>> {
    try {
      const updatedBarang = await this.barangService.update(+id, barang);
      return {
        success: true,
        message: 'Barang updated successfully',
        data: updatedBarang,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to update barang',
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<void>> {
    try {
      await this.barangService.remove(+id);
      return {
        success: true,
        message: 'Barang deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to delete barang',
      };
    }
  }

  @Delete()
  async removeBulk(@Query('ids') ids: string): Promise<ApiResponse<void>> {
    try {
      const idArray = ids.split(',').map((id) => +id);
      await this.barangService.removeBulk(idArray);
      return {
        success: true,
        message: 'Barang deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to delete barang',
      };
    }
  }
}
