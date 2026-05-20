import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cidade } from './entities/cidade.entity';
import { CidadeController } from './controllers/cidade.controller';
import { CidadeService } from './services/cidade.service';

@Module({
    imports: [TypeOrmModule.forFeature([Cidade])],
    controllers: [CidadeController],
    providers: [CidadeService],
    exports: [CidadeService],
})
export class CidadeModule {}