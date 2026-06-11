import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './services/dashboard.service';

import { Viagem } from '../viagem/entities/viagem.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Viagem,
        ]),
    ],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule {}