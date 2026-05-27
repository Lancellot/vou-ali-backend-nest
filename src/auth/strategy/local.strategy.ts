import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";
import { UsuarioResponse } from "../interfaces/usuario-response.interface";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    private _emailField: string;
    private _passwordField: string;

    constructor(private readonly authService: AuthService) {
        super({  }); 
        this._emailField = 'email';
        this._passwordField = 'senha';
    }

    async validate(email: string, senha: string): Promise<UsuarioResponse | null> {
        const validaUsuario = await this.authService.validateUser(email, senha);
        if (!validaUsuario) {
            throw new UnauthorizedException("Usuário e/ou senha incorretos!");
        }
        return validaUsuario;
    }

}
