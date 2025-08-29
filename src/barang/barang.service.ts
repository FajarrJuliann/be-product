import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Barang } from '../entities/barang.entity';
import { CustomLoggerService } from '../common/logger.service';

@Injectable()
export class BarangService {
  constructor(
    @InjectRepository(Barang)
    private barangRepository: Repository<Barang>,
    private readonly logger: CustomLoggerService,
  ) {}

  async findAll(
    search?: string,
  ): Promise<{ count_data: number; data: Barang[] }> {
    try {
      if (search && search.trim() !== '') {
        const barangList = await this.barangRepository
          .createQueryBuilder('barang')
          .leftJoinAndSelect('barang.kategori', 'kategori')
          .where('barang.nama_barang LIKE :search', { search: `%${search}%` })
          .orWhere('CAST(barang.stok AS CHAR) LIKE :search', {
            search: `%${search}%`,
          })
          .orWhere('barang.kelompok_barang LIKE :search', {
            search: `%${search}%`,
          })
          .orWhere('CAST(barang.harga AS CHAR) LIKE :search', {
            search: `%${search}%`,
          })
          .orWhere('kategori.nama_kategori LIKE :search', {
            search: `%${search}%`,
          })
          .getMany();

        return {
          count_data: barangList?.length ?? 0,
          data: barangList ?? [],
        };
      }

      const barangList = await this.barangRepository.find({
        relations: ['kategori'],
      });
      return {
        count_data: barangList?.length ?? 0,
        data: barangList ?? [],
      };
    } catch (error) {
      this.logger.error(
        `Gagal mengambil data barang: ${error.message}`,
        error.stack,
        'BarangService',
      );
      throw error;
    }
  }

  async findOne(id: number): Promise<Barang | null> {
    if (!id) {
      const error = new BadRequestException('ID barang tidak valid');
      this.logger.error(error.message, error.stack, 'BarangService');
      throw error;
    }
    try {
      return await this.barangRepository.findOne({
        where: { id },
        relations: ['kategori'],
      });
    } catch (error) {
      this.logger.error(
        `Gagal mengambil barang ID ${id}: ${error.message}`,
        error.stack,
        'BarangService',
      );
      throw error;
    }
  }

  async create(barang: Barang): Promise<Barang> {
    if (
      !barang ||
      !barang.nama_barang ||
      !barang.kategori_id ||
      !barang.stok ||
      !barang.kelompok_barang ||
      !barang.harga
    ) {
      const error = new BadRequestException('Data barang tidak lengkap');
      this.logger.error(error.message, error.stack, 'BarangService');
      throw error;
    }

    try {
      // Validasi nama barang duplikat
      const existingBarang = await this.barangRepository.findOne({
        where: { nama_barang: barang.nama_barang },
      });
      if (existingBarang) {
        const error = new BadRequestException('Nama barang sudah digunakan');
        this.logger.error(error.message, error.stack, 'BarangService');
        throw error;
      }

      return await this.barangRepository.save(barang);
    } catch (error) {
      this.logger.error(
        `Gagal membuat barang: ${error.message}`,
        error.stack,
        'BarangService',
      );
      throw error;
    }
  }

  async update(id: number, barang: Barang): Promise<Barang> {
    if (!id) {
      const error = new BadRequestException('ID barang tidak valid');
      this.logger.error(error.message, error.stack, 'BarangService');
      throw error;
    }
    if (
      !barang ||
      !barang.nama_barang ||
      !barang.kategori_id ||
      !barang.stok ||
      !barang.kelompok_barang ||
      !barang.harga
    ) {
      const error = new BadRequestException('Data barang tidak lengkap');
      this.logger.error(error.message, error.stack, 'BarangService');
      throw error;
    }

    try {
      // Validasi nama barang duplikat, kecuali untuk barang dengan ID yang sama
      const existingBarang = await this.barangRepository.findOne({
        where: { nama_barang: barang.nama_barang },
      });
      if (existingBarang && existingBarang.id !== id) {
        const error = new BadRequestException('Nama barang sudah digunakan');
        this.logger.error(error.message, error.stack, 'BarangService');
        throw error;
      }

      await this.barangRepository.update(id, barang);
      const updatedBarang = await this.findOne(id);
      if (!updatedBarang) {
        const error = new BadRequestException(
          `Barang dengan ID ${id} tidak ditemukan`,
        );
        this.logger.error(error.message, error.stack, 'BarangService');
        throw error;
      }
      return updatedBarang;
    } catch (error) {
      this.logger.error(
        `Gagal memperbarui barang ID ${id}: ${error.message}`,
        error.stack,
        'BarangService',
      );
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    if (!id) {
      const error = new BadRequestException('ID barang tidak valid');
      this.logger.error(error.message, error.stack, 'BarangService');
      throw error;
    }
    try {
      const barang = await this.findOne(id);
      if (!barang) {
        const error = new BadRequestException(
          `Barang dengan ID ${id} tidak ditemukan`,
        );
        this.logger.error(error.message, error.stack, 'BarangService');
        throw error;
      }
      await this.barangRepository.delete(id);
    } catch (error) {
      this.logger.error(
        `Gagal menghapus barang ID ${id}: ${error.message}`,
        error.stack,
        'BarangService',
      );
      throw error;
    }
  }

  async removeBulk(ids: number[]): Promise<void> {
    if (!ids || ids.length === 0) {
      const error = new BadRequestException('Daftar ID barang tidak valid');
      this.logger.error(error.message, error.stack, 'BarangService');
      throw error;
    }
    try {
      const barangList = await this.barangRepository.findBy({ id: In(ids) });
      if (barangList.length !== ids.length) {
        const missingIds = ids.filter(
          (id) => !barangList.some((barang) => barang.id === id),
        );
        const error = new BadRequestException(
          `Barang dengan ID ${missingIds.join(', ')} tidak ditemukan`,
        );
        this.logger.error(error.message, error.stack, 'BarangService');
        throw error;
      }
      await this.barangRepository.delete(ids);
    } catch (error) {
      this.logger.error(
        `Gagal menghapus barang secara bulk: ${error.message}`,
        error.stack,
        'BarangService',
      );
      throw error;
    }
  }
}
