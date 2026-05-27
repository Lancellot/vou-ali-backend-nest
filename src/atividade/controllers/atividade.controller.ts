import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { AtividadeService } from '../services/atividade.service';
import { Atividade } from '../entities/atividade.entity';

@ApiTags('Atividade')
@Controller('/atividades')
export class AtividadeController {

    constructor(private readonly atividadeService: AtividadeService) {}

    @Get('/all')
    findAll(): Promise<Atividade[]> {
        return this.atividadeService.findAll();
    }

    @Get('/:id')
    findById(@Param('id') id: number): Promise<Atividade> {
        return this.atividadeService.findById(id);
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() atividade: Atividade): Promise<Atividade> {
        return this.atividadeService.create(atividade);
    }

    @Put('/atualizar')
    update(@Body() atividade: Atividade): Promise<Atividade> {
        return this.atividadeService.update(atividade);
    }

    @Delete('/remover/:id')
    delete(@Param('id') id: number): Promise<void> {
        return this.atividadeService.delete(id);
    }
}