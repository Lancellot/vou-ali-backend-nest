import {
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Despesa } from '../entities/despesa.entity';

@Injectable()
export class DespesaService {

    constructor(
        @InjectRepository(Despesa)
        private despesaRepository: Repository<Despesa>,
    ) {}

    async findAll(): Promise<Despesa[]> {
        return this.despesaRepository.find({
            relations: ['viagem'],
        });
    }

    async findById(id: number): Promise<Despesa> {

        const despesa = await this.despesaRepository.findOne({
            where: { id },
            relations: ['viagem'],
        });

        if (!despesa)
            throw new HttpException(
                'Despesa não encontrada!',
                HttpStatus.NOT_FOUND,
            );

        return despesa;
    }

    async create(despesa: Despesa): Promise<Despesa> {
        return this.despesaRepository.save(despesa);
    }

    async update(despesa: Despesa): Promise<Despesa> {
        return this.despesaRepository.save(despesa);
    }

    async delete(id: number): Promise<void> {
        await this.despesaRepository.delete(id);
    }
}