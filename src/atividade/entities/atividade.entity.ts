import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Parada } from '../../parada/entities/parada.entity';

@Entity({ name: 'tb_atividades' })
export class Atividade {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    titulo!: string;

    @Column({ length: 50 })
    categoria!: string;

    @Column()
    dataHora!: Date;

    @ManyToOne(() => Parada, (parada) => parada.atividades)
    @JoinColumn({ name: 'paradaId' })
    parada!: Parada;

    @Column()
    paradaId!: number;
}