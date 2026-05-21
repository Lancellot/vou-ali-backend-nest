import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Atividade } from '../entities/atividade.entity';

@Injectable()
export class AtividadeService {
    constructor(
        @InjectRepository(Atividade)
        private atividadeRepository: Repository<Atividade>,
    ) {}

    async findAll(): Promise<Atividade[]> {
        return this.atividadeRepository.find({
            relations: ['parada'],
        });
    }

    async findById(id: number): Promise<Atividade> {
        const atividade = await this.atividadeRepository.findOne({
            where: { id },
            relations: ['parada'],
        });

        if (!atividade)
            throw new HttpException('Atividade não encontrada!', HttpStatus.NOT_FOUND);

        return atividade;
    }

    async create(atividade: Atividade): Promise<Atividade> {
        return this.atividadeRepository.save(atividade);
    }

    async update(atividade: Atividade): Promise<Atividade> {
        return this.atividadeRepository.save(atividade);
    }

    async delete(id: number): Promise<void> {
        await this.atividadeRepository.delete(id);
    }
}