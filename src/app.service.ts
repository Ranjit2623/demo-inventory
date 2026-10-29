import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}

  getStatus() {
    return {
      service: 'inventory-service',
      zone: 'inventory',
      port: Number(this.config.get<string>('PORT', '3002')),
      database: this.config.get<string>('DB_DATABASE', 'inventory_db'),
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
