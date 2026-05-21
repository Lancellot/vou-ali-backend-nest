import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parada } from '../entities/parada.entity';

@Injectable()
export class ParadaService {
    constructor(
        @InjectRepository(Parada)
        private paradaRepository: Repository<Parada>,
    ) {}

    async findAll(): Promise<Parada[]> {
        return this.paradaRepository.find({
            relations: ['cidade', 'atividades'],
        });
    }

    async findById(id: number): Promise<Parada> {
        const parada = await this.paradaRepository.findOne({
            where: { id },
            relations: ['cidade', 'atividades'],
        });

        if (!parada)
            throw new HttpException('Parada não encontrada!', HttpStatus.NOT_FOUND);

        return parada;
    }

    async create(parada: Parada): Promise<Parada> {
        return this.paradaRepository.save(parada);
    }

    async update(parada: Parada): Promise<Parada> {
        return this.paradaRepository.save(parada);
    }

    async delete(id: number): Promise<void> {
        await this.paradaRepository.delete(id);
    }
}