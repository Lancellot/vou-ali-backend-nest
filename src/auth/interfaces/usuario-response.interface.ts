import { Viagem } from "../../viagem/entities/viagem.entity";

export interface UsuarioResponse {
    id: number;
    nome: string;
    email: string;
    createdAt: Date;
    viagens?: Viagem[];
}