import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from './entities/inventory-item.entity';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryItem)
    private readonly itemRepository: Repository<InventoryItem>,
  ) {}

  async create(dto: CreateInventoryItemDto): Promise<InventoryItem> {
    const existing = await this.itemRepository.findOne({
      where: { sku: dto.sku },
    });
    if (existing) {
      throw new ConflictException(`Item with SKU '${dto.sku}' already exists`);
    }

    const item = this.itemRepository.create(dto);
    return this.itemRepository.save(item);
  }

  async findAll(): Promise<InventoryItem[]> {
    return this.itemRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<InventoryItem> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Inventory item #${id} not found`);
    }
    return item;
  }

  async findBySku(sku: string): Promise<InventoryItem> {
    const item = await this.itemRepository.findOne({ where: { sku } });
    if (!item) {
      throw new NotFoundException(`Item with SKU '${sku}' not found`);
    }
    return item;
  }

  async updateStock(id: number, delta: number): Promise<InventoryItem> {
    const item = await this.findOne(id);
    const newQty = item.quantity + delta;
    if (newQty < 0) {
      throw new BadRequestException(
        `Insufficient stock for '${item.itemName}' (SKU: ${item.sku}). Current: ${item.quantity}, Requested change: ${delta}`,
      );
    }
    item.quantity = newQty;
    return this.itemRepository.save(item);
  }
}
