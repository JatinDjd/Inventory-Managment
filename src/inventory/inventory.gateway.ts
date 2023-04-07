import { WebSocketGateway, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Inventory } from './entities/inventory.entity';
import { InventoryService } from './inventory.service';

@WebSocketGateway({ namespace: 'inventory' })
export class InventoryGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private server: Server;
  
  // constructor(private readonly inventoryService: InventoryService) {}
  
  handleConnection() {
    console.log('Client connected');
  }

  handleDisconnect() {
    console.log('Client disconnected');
  }
  
  afterInit(server: Server) {
    this.server = server;
  }
  
  async handleItemCreated(item: Inventory) {
    this.server.emit('itemCreated', item);
  }

  async handleItemUpdated(item: Inventory) {
    this.server.emit('itemUpdated', item);
  }

  async handleItemDeleted(id: number) {
    this.server.emit('itemDeleted', id);
  }
  
  
}

