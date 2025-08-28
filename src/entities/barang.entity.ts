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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_barang: string;

  @Column()
  kategori_id: number;

  @Column()
  stok: number;

  @Column()
  kelompok_barang: string;

  @Column('decimal', { precision: 10, scale: 2 })
  harga: number;

  @ManyToOne(() => Kategori, (kategori) => kategori.id, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'kategori_id' }) // Menentukan bahwa kolom kategori_id digunakan untuk relasi
  kategori: Kategori;
}
