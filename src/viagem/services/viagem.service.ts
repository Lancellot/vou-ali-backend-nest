import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Viagem } from "../entities/viagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class ViagemService {
    constructor(
        @InjectRepository(Viagem)
        private viagemRepository: Repository<Viagem>,
    ) { }

    async findAll(): Promise<Viagem[]> {
        return this.viagemRepository.find({
            relations: {
                usuario: true,
            },
        });
    }

    async findById(id: number): Promise<Viagem | null> {

        const viagem = await this.viagemRepository.findOne({
            where: { id },
            relations: {
            usuario: true,
            },
        });

        if (!viagem) 
            throw new HttpException('Viagem não encontrada', HttpStatus.NOT_FOUND);
        
        return viagem;
    }

    async create(viagem: Viagem): Promise<Viagem> {
        return this.viagemRepository.save(viagem);
    }

    async update(viagem: Viagem): Promise<Viagem> {
        return this.viagemRepository.save(viagem);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.viagemRepository.delete(id);
    }
}