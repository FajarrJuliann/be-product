// src/barang/barang.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Barang } from '../entities/barang.entity';

@Injectable()
export class BarangService {
  constructor(
    @InjectRepository(Barang)
    private barangRepository: Repository<Barang>,
  ) {}

  findAll(): Promise<Barang[]> {
    return this.barangRepository.find({ relations: ['kategori'] });
  }

  findOne(id: number): Promise<Barang | null> {
    return this.barangRepository.findOne({
      where: { id },
      relations: ['kategori'],
    });
  }

  async create(barang: Barang): Promise<Barang> {
    return this.barangRepository.save(barang);
  }

  async update(id: number, barang: Barang): Promise<Barang> {
    await this.barangRepository.update(id, barang);
    const updatedBarang = await this.findOne(id);
    if (!updatedBarang) {
      throw new Error(`Barang with ID ${id} not found`);
    }
    return updatedBarang;
  }

  async remove(id: number): Promise<void> {
    await this.barangRepository.delete(id);
  }

  async removeBulk(ids: number[]): Promise<void> {
    await this.barangRepository.delete(ids);
  }
}
