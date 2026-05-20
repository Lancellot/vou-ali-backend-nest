import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';


@Entity({ name: 'tb_viagens' })
export class Viagem {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id!: number;

    @ApiProperty({
        description: 'Título da viagem',
        example: 'Viagem para Gramado',
    })
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    titulo!: string;

    @ApiProperty({
        description: 'Destino da viagem',
        example: 'Gramado - RS',
    })
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    destino!: string;

    @ApiProperty({
        description: 'Data de início da viagem',
    })
    @IsDateString()
    @Column({ type: 'date', nullable: false })
    dataInicio!: Date;

    @ApiProperty({
        description: 'Data de fim da viagem',
    })
    @IsDateString()
    @Column({ type: 'date', nullable: false })
    dataFim!: Date;

    @ApiProperty({
        description: 'Descrição da viagem',
    })
    @Column({ length: 500, nullable: true })
    descricao!: string;

    @ApiProperty({
        description: 'Usuário dono da viagem',
        type: () => Usuario,
    })
    @ManyToOne(() => Usuario, (usuario) => usuario.viagens, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'usuario_id' })
    usuario!: Usuario;
}