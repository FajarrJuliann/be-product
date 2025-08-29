import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarangModule } from './barang/barang.module';
import { KategoriModule } from './kategori/kategori.module';
import { CustomLoggerService } from './common/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // supaya bisa dipakai di semua module
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    BarangModule,
    KategoriModule,
  ],
  controllers: [AppController],
  providers: [AppService, CustomLoggerService],
})
export class AppModule {}
