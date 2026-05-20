import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({ name: 'tb_cidades' })
export class Cidade {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id!: number;

    @ApiProperty({ description: 'Nome da cidade', example: 'São Paulo' })
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    nome!: string;

    @ApiProperty({ description: 'Estado da cidade', example: 'SP' })
    @IsNotEmpty()
    @Column({ length: 100, nullable: true })
    estado!: string;

    @ApiProperty({ description: 'País da cidade', example: 'Brasil' })
    @IsNotEmpty()
    @Column({ length: 100, nullable: true })
    pais!: string;

    @ApiProperty({ description: 'Paradas da cidade', example: [] })
    @OneToMany(() => Parada, (parada) => parada.cidade)
    paradas!: Parada[];
}