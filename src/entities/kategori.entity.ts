//src/entities/kategori.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Kategori {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_kategori: string;
}
