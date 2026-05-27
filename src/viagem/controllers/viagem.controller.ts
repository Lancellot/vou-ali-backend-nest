import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ViagemService } from "../services/viagem.service";
import { Viagem } from "../entities/viagem.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@ApiTags('Postagem')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/viagens')
export class ViagemController {
    constructor(private readonly viagemService: ViagemService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Viagem[]> {
        return this.viagemService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Viagem> {
        return this.viagemService.findById(id);
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param('titulo') titulo: string): Promise<Viagem[]> {
        return this.viagemService.findByTitulo(titulo);
    }

    @Get('/:id/completa')
    @HttpCode(HttpStatus.OK)
    findCompleteById(@Param('id') id: number): Promise<Viagem> {
    return this.viagemService.findCompleteById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() viagem: Viagem): Promise<Viagem> {
        return this.viagemService.create(viagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() viagem: Viagem): Promise<Viagem> {
        return this.viagemService.update(viagem);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.viagemService.delete(id);
    }
}