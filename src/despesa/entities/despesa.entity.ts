import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Viagem } from '../../viagem/entities/viagem.entity';

@Entity({ name: 'tb_despesas' })
export class Despesa {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100, nullable: false })
    descricao!: string;

    @Column('decimal', {
        precision: 10,
        scale: 2,
        nullable: false,
    })
    valor!: number;

    @Column({ length: 50, nullable: false })
    categoria!: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    data!: Date;

    @ManyToOne(() => Viagem, (viagem) => viagem.despesas)
    @JoinColumn({ name: 'viagemId' })
    viagem!: Viagem;

    @Column()
    viagemId!: number;
}