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

import { Despesa } from '../entities/despesa.entity';
import { DespesaService } from '../services/despesa.service';

@ApiTags('Despesa')
@Controller('/despesas')
export class DespesaController {

    constructor(
        private readonly despesaService: DespesaService,
    ) {}

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Despesa[]> {
        return this.despesaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id') id: number): Promise<Despesa> {
        return this.despesaService.findById(id);
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() despesa: Despesa): Promise<Despesa> {
        return this.despesaService.create(despesa);
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    update(@Body() despesa: Despesa): Promise<Despesa> {
        return this.despesaService.update(despesa);
    }

    @Delete('/remover/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') id: number): Promise<void> {
        return this.despesaService.delete(id);
    }
}