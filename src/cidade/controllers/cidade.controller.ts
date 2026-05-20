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
import { CidadeService } from '../services/cidade.service';
import { Cidade } from '../entities/cidade.entity';

@ApiTags('Cidade')
@Controller('/cidades')
export class CidadeController {
    constructor(private readonly cidadeService: CidadeService) { }

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Cidade[]> {
        return this.cidadeService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id') id: number): Promise<Cidade> {
        return this.cidadeService.findById(id);
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() cidade: Cidade): Promise<Cidade> {
        return this.cidadeService.create(cidade);
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    update(@Body() cidade: Cidade): Promise<Cidade> {
        return this.cidadeService.update(cidade);
    }

    @Delete('/remover/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') id: number): Promise<void> {
        return this.cidadeService.delete(id);
    }
}