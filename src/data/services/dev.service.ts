import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Viagem } from "../../viagem/entities/viagem.entity";
import { Cidade } from "../../cidade/entities/cidade.entity";
import { Parada } from "../../parada/entities/parada.entity";
import { Atividade } from "../../atividade/entities/atividade.entity";
import { Despesa } from "../../despesa/entities/despesa.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: process.env.DB_TYPE as 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [Usuario, Viagem, Cidade, Parada, Atividade, Despesa],
            synchronize: true,
        };
    }
}