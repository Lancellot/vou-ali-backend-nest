import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ViagemService } from "../services/viagem.service";
import { Viagem } from "../entities/viagem.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import type { Request } from "express";

@ApiTags('Postagem')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/viagens')
export class ViagemController {
    constructor(private readonly viagemService: ViagemService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@Req() req: Request): Promise<Viagem[]> {
        const usuarioId = (req as any).user.id;
        return this.viagemService.findAllByUsuario(usuarioId);
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
    @HttpCode(HttpStatus.OK)
    create(@Req() req: any, @Body() viagem: Viagem) {
    return this.viagemService.create(viagem, req.user.id);
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