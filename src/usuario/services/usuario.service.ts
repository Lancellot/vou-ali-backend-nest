import { HttpException, HttpStatus,Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypy';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    async findByUsuario(email: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
        where: { email }
    });
    }

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
            const buscaUsuario = await this.findByUsuario(usuario.email);
            
            if (buscaUsuario)
            throw new HttpException('O Usuário já existe!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha); 
        return await this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario> {
        await this.findById(usuario.id);
        const buscaUsuario = await this.findByUsuario(usuario.email);

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
        throw new HttpException('Usuário (e-mail) já Cadastrado!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
        return await this.usuarioRepository.save(usuario);
    }
}