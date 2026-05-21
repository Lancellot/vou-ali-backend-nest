import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parada } from './entities/parada.entity';
import { ParadaController } from './controllers/parada.controller';
import { ParadaService } from './services/parada.service';


@Module({
    imports: [TypeOrmModule.forFeature([Parada])],
    controllers: [ParadaController],
    providers: [ParadaService],
    exports: [ParadaService],
})
export class ParadaModule {}