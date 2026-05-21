import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Despesa } from './entities/despesa.entity';
import { DespesaController } from './controllers/despesa.controller';
import { DespesaService } from './services/despesa.service';

@Module({
    imports: [TypeOrmModule.forFeature([Despesa])],
    controllers: [DespesaController],
    providers: [DespesaService],
    exports: [DespesaService],
})
export class DespesaModule {}