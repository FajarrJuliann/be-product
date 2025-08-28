//src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarangModule } from './barang/barang.module';
import { KategoriModule } from './kategori/kategori.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // Ganti dengan username MySQL kamu
      password: '123456', // Ganti dengan password MySQL kamu
      database: 'product',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set true untuk auto-create tabel (hati-hati di production)
    }),
    BarangModule,
    KategoriModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
