import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Cidade } from '../entities/cidade.entity';

@Injectable()
export class CidadeService {
    constructor(
        @InjectRepository(Cidade)
        private cidadeRepository: Repository<Cidade>,
    ) {}

    async findAll(): Promise<Cidade[]> {
        return this.cidadeRepository.find();
    }

    async findById(id: number): Promise<Cidade> {
        const cidade = await this.cidadeRepository.findOne({
            where: { id },
        });

        if (!cidade)
            throw new HttpException('Cidade não encontrada!', HttpStatus.NOT_FOUND);

        return cidade;
    }

    async findByNome(nome: string): Promise<Cidade> {
        const cidade = await this.cidadeRepository.findOne({
            where: { nome: ILike(`%${nome}%`) }
        });
        if (!cidade)
            throw new HttpException('Cidade não encontrada!', HttpStatus.NOT_FOUND);
        return cidade;
    }

    async create(cidade: Cidade): Promise<Cidade> {
        return this.cidadeRepository.save(cidade);
    }

    async update(cidade: Cidade): Promise<Cidade> {
        return this.cidadeRepository.save(cidade);
    }

    async delete(id: number): Promise<void> {
        await this.cidadeRepository.delete(id);
    }
}