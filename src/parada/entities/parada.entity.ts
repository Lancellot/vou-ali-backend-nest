import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Viagem } from '../../viagem/entities/viagem.entity';
import { Cidade } from '../../cidade/entities/cidade.entity';
import { Atividade } from '../../atividade/entities/atividade.entity';

@Entity({ name: 'tb_paradas' })
export class Parada {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    ordem!: number;

    @Column({ nullable: true })
    dataChegada!: Date;

    @Column({ nullable: true })
    dataSaida!: Date;

    @ManyToOne(() => Viagem, (viagem) => viagem.paradas)
    @JoinColumn({ name: 'viagemId' })
    viagem!: Viagem;

    @Column()
    viagemId!: number;

    @ManyToOne(() => Cidade, (cidade) => cidade.paradas)
    @JoinColumn({ name: 'cidadeId' })
    cidade!: Cidade;

    @Column()
    cidadeId!: number;

    @OneToMany(() => Atividade, (atividade) => atividade.parada)
    atividades!: Atividade[];
}