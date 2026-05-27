import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { UsuarioLogin } from '../entities/usuariologin.entity';

import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioResponse } from '../interfaces/usuario-response.interface';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) { }

    async validateUser(email: string, password: string): Promise<UsuarioResponse| null> {
        const buscaUsuario = await this.usuarioService.findByUsuario(email);
        
        if (!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
        
        const matchPassword = await this.bcrypt.compararSenhas(password, buscaUsuario.senha);
        
        if (buscaUsuario && matchPassword) {
            const { senha, ...resposta } = buscaUsuario;
            return resposta;
        }
        
        return null;
    }

    async login(usuarioLogin: UsuarioLogin) {

        const usuario = await this.validateUser(usuarioLogin.email, usuarioLogin.senha);
        
        if (!usuario) {
            throw new HttpException('Email ou senha incorretos!', HttpStatus.UNAUTHORIZED);
        }

        const payload = { sub: usuario.email };
        
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            createdAt: usuario.createdAt,
            viagens: usuario.viagens,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        };
    }
}