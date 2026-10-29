import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('inventory_items')
export class InventoryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sku: string;

  @Column()
  itemName: string;

  @Column('int', { default: 0 })
  quantity: number;

  @Column({ default: 'Warehouse-Main' })
  location: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0.0 })
  unitPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
