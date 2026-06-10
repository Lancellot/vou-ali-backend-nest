import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parada } from '../entities/parada.entity';
import { Cidade } from '../../cidade/entities/cidade.entity';
import { Viagem } from '../../viagem/entities/viagem.entity';

@Injectable()
export class ParadaService {
    constructor(
        @InjectRepository(Parada)
        private paradaRepository: Repository<Parada>,
    ) {}

    async findAll(): Promise<Parada[]> {
        return this.paradaRepository.find({
            relations: ['cidade', 'atividades', 'viagem'],
        });
    }

    async findById(id: number): Promise<Parada> {
        const parada = await this.paradaRepository.findOne({
            where: { id },
            relations: ['cidade', 'atividades', 'viagem'],
        });

        if (!parada)
            throw new HttpException('Parada não encontrada!', HttpStatus.NOT_FOUND);

        return parada;
    }

    async create(parada: Parada): Promise<Parada> {
    const novaParada = this.paradaRepository.create({
        ...parada,
        cidade: { id: parada.cidadeId } as Cidade,
        viagem: { id: parada.viagemId } as Viagem,
    });

    return this.paradaRepository.save(novaParada);
    }

    async update(parada: Parada): Promise<Parada> {
    const paradaAtualizada = this.paradaRepository.create({
        ...parada,
        cidade: { id: parada.cidadeId } as Cidade,
        viagem: { id: parada.viagemId } as Viagem,
    });

    return this.paradaRepository.save(paradaAtualizada);
    }

    async delete(id: number): Promise<void> {
        await this.paradaRepository.delete(id);
    }
}