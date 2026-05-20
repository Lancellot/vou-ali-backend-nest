import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Viagem } from './entities/viagem.entity';
import { ViagemController } from './controllers/viagem.controller';
import { ViagemService } from './services/viagem.service';

@Module({
    imports: [TypeOrmModule.forFeature([Viagem])],
    controllers: [ViagemController],
    providers: [ViagemService],
    exports: [TypeOrmModule, ViagemService],
})
export class ViagemModule { }