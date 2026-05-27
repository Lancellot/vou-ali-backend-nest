import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atividade } from './entities/atividade.entity';
import { AtividadeController } from './controllers/atividade.controller';
import { AtividadeService } from './services/atividade.service';

@Module({
    imports: [TypeOrmModule.forFeature([Atividade])],
    controllers: [AtividadeController],
    providers: [AtividadeService],
    exports: [AtividadeService],
})
export class AtividadeModule {}