import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Viagem } from '../../viagem/entities/viagem.entity';

@Injectable()
export class DashboardService {

    constructor(
        @InjectRepository(Viagem)
        private viagemRepository: Repository<Viagem>,
    ) {}

    async dashboard(usuarioId: number) {

    console.log('Usuario logado:', usuarioId);

    const viagens = await this.viagemRepository.find({
        where: {
            usuario: {
                id: usuarioId,
            },
        },
        relations: [
            'usuario',
            'paradas',
            'paradas.atividades',
            'despesas',
        ],
    });

    console.log(
        'Viagens encontradas:',
        viagens.map(v => ({
            id: v.id,
            titulo: v.titulo,
            usuarioId: v.usuario?.id,
            email: v.usuario?.email,
        }))
    );

        const totalViagens =
            viagens.length;

        const totalParadas =
            viagens.reduce(
                (acc, viagem) =>
                    acc +
                    (viagem.paradas?.length || 0),
                0,
            );

        const totalAtividades =
            viagens.reduce(
                (acc, viagem) =>
                    acc +
                    (viagem.paradas || []).reduce(
                        (soma, parada) =>
                            soma +
                            (parada.atividades?.length || 0),
                        0,
                    ),
                0,
            );

        const despesas =
            viagens.flatMap(
                (v) => v.despesas || [],
            );

        const totalDespesas =
            despesas.length;

        const valorTotalDespesas =
            despesas.reduce(
                (acc, despesa) =>
                    acc + Number(despesa.valor),
                0,
            );

        return {
            totalViagens,
            totalParadas,
            totalAtividades,
            totalDespesas,
            valorTotalDespesas,
            viagensRecentes: viagens.slice(0, 5),
        };
    }
}