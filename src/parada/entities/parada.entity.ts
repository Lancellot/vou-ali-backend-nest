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

    
    viagemId!: number;

    @ManyToOne(() => Cidade, (cidade) => cidade.paradas, { eager: true })
    @JoinColumn({ name: 'cidadeId' })
    cidade!: Cidade;

    cidadeId!: number;

    @OneToMany(() => Atividade, (atividade) => atividade.parada)
    atividades!: Atividade[];
}