import { HttpException, HttpStatus,Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) { }

    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }

    async findById(id: number): Promise<Usuario> {
        
        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            }
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async create(usuario: Usuario): Promise<Usuario> {
        return this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario> {
        return this.usuarioRepository.save(usuario);
    }

    async delete(id: number): Promise<void> {
        await this.usuarioRepository.delete(id);
    }
}