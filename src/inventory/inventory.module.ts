import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { InventoryGateway } from './inventory.gateway';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Inventory])
  ],
  controllers: [InventoryController],
  providers: [InventoryService, InventoryGateway]
})
export class InventoryModule {}
