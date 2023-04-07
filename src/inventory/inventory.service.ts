import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository, } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InventoryGateway } from './inventory.gateway';


@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventory:Repository<Inventory>,
    private readonly inventoryGateway: InventoryGateway,
  ) {}



  async create(data) {
    try {
      
      const items = await this.inventory.save(data)
      this.inventoryGateway.handleItemCreated(items);
      return items;
    } catch (error) {
      throw error;
    }
    
  }

  findAll() {
    return this.inventory.find();
  }

  findOne(id: number) {
    return this.inventory.findOne({ where: { id: id } })
  }

  async update(id, updateInventoryDto: UpdateInventoryDto) {
    await this.inventory.update(id,updateInventoryDto) ;
    const item = await this.inventory.findOne({ where: { id: id } });
    this.inventoryGateway.handleItemUpdated(item);
    return item
  }

  remove(id: number) {
    return this.inventory.delete(id).then(() => undefined);
  }
}
