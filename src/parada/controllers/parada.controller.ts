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

import { Parada } from '../entities/parada.entity';
import { ParadaService } from '../services/parada.service';

@ApiTags('Parada')
@Controller('/paradas')
export class ParadaController {

    constructor(private readonly paradaService: ParadaService) {}

    @Get('/all')
    findAll(): Promise<Parada[]> {
        return this.paradaService.findAll();
    }

    @Get('/:id')
    findById(@Param('id') id: number): Promise<Parada> {
        return this.paradaService.findById(id);
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() parada: Parada): Promise<Parada> {
        return this.paradaService.create(parada);
    }

    @Put('/atualizar')
    update(@Body() parada: Parada): Promise<Parada> {
        return this.paradaService.update(parada);
    }

    @Delete('/remover/:id')
    delete(@Param('id') id: number): Promise<void> {
        return this.paradaService.delete(id);
    }
}