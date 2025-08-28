//src/kategori/kategori.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kategori } from '../entities/kategori.entity';

@Injectable()
export class KategoriService {
  constructor(
    @InjectRepository(Kategori)
    private kategoriRepository: Repository<Kategori>,
  ) {}

  findAll(): Promise<Kategori[]> {
    return this.kategoriRepository.find();
  }
}
