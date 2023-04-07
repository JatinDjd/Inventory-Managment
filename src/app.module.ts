import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryModule } from './inventory/inventory.module';
import { InventoryController } from './inventory/inventory.controller';
import { Inventory } from './inventory/entities/inventory.entity';
import { InventoryService } from './inventory/inventory.service';
import { Server } from 'http';
// import { createServer } from 'socket.io';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        // port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Inventory],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    InventoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
