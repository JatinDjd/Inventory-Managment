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
    @InjectRepository(Inventory)                          //Fetch entity through InjectRepository decorator and create an object for it
    private readonly inventory:Repository<Inventory>,    
    private readonly inventoryGateway: InventoryGateway,
  ) {}



  async create(data) {
    try {
      
      const items = await this.inventory.save(data)     // Saves or Creates new entery in inventory
      this.inventoryGateway.handleItemCreated(items);    // connecting with socket
      return items;
    } catch (error) {
      throw error;
    }
    
  }

  findAll() {
    return this.inventory.find();       // Lists all items in inventory
  }

  findOne(id: number) {
    return this.inventory.findOne({ where: { id: id } })      // Lists items by id from inventory
  }

  async update(id, updateInventoryDto: UpdateInventoryDto) {    // Updates an existing record
    await this.inventory.update(id,updateInventoryDto) ;
    const item = await this.inventory.findOne({ where: { id: id } });
    this.inventoryGateway.handleItemUpdated(item);          // connecting with socket
    return item
  }

  remove(id: number) {          // deletes a record
    return this.inventory.delete(id).then(() => undefined);
  }
}
