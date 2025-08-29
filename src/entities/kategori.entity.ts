//src/entities/kategori.entity.ts
// Entitas untuk tabel kategori
// Mendefinisikan struktur tabel kategori di database

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Kategori {
  // Primary key dengan auto-increment
  @PrimaryGeneratedColumn()
  id: number;

  // Kolom untuk nama kategori (contoh: "Elektronik")
  @Column()
  nama_kategori: string;
}
