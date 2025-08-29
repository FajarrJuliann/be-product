//src/entities/barang.entity.ts
// Entitas untuk tabel barang
// Mendefinisikan struktur tabel barang dan relasi dengan tabel kategori

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Kategori } from './kategori.entity';

@Entity()
export class Barang {
  // Primary key dengan auto-increment
  @PrimaryGeneratedColumn()
  id: number;

  // Nama barang (free text)
  @Column()
  nama_barang: string;

  // Foreign key ke tabel kategori
  @Column()
  kategori_id: number;

  // Jumlah stok barang
  @Column()
  stok: number;

  // Kelompok barang (untuk dropdown statis di front-end)
  @Column()
  kelompok_barang: string;

  // Harga barang dengan format desimal (untuk rupiah)
  @Column('decimal', { precision: 12, scale: 2 })
  harga: number;

  // Relasi Many-to-One ke tabel Kategori, menggunakan kolom kategori_id
  @ManyToOne(() => Kategori, (kategori) => kategori.id, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'kategori_id' }) // Menentukan kolom kategori_id sebagai foreign key
  kategori: Kategori;
}
