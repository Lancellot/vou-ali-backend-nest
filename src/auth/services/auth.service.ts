import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { UsuarioLogin } from '../entities/usuariologin.entity';

import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioResponse } from '../interfaces/usuario-response.interface';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) { }

    private googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

    const usuario = await this.validateUser(
        usuarioLogin.email,
        usuarioLogin.senha
    );

    if (!usuario) {
        throw new HttpException(
            'Email ou senha incorretos!',
            HttpStatus.UNAUTHORIZED
        );
    }

    const payload = {
        sub: usuario.id,
        email: usuario.email,
    };

    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        createdAt: usuario.createdAt,
        viagens: usuario.viagens,
        token: `Bearer ${this.jwtService.sign(payload)}`,
    };
}

    async loginGoogle(credential: string) {
    const ticket = await this.googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
        throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
    }

    let usuario = await this.usuarioService.findByUsuario(payload.email);

    if (!usuario) {
        usuario = await this.usuarioService.create({
            nome: payload.name ?? payload.email,
            email: payload.email,
            senha: await this.bcrypt.criptografarSenha(payload.sub), // sub como senha
        } as Usuario);
    }

    const jwtPayload = { sub: usuario.id, email: usuario.email };

    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        createdAt: usuario.createdAt,
        token: `Bearer ${this.jwtService.sign(jwtPayload)}`,
    };
}

}