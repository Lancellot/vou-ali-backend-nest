import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Exclude } from "class-transformer"
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
    
    
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id!: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    nome!: string;

    @ApiProperty({ description: 'Email do usuário', example: 'usuario@example.com' })
    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 100, unique: true, nullable: false })
    email!: string;

    @ApiProperty({ description: 'Senha do usuário', example: 'senha123' })
    @Exclude({ toPlainOnly: true })
    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    senha!: string;

    @ApiProperty({ description: 'Data de criação do usuário' })
    @CreateDateColumn()
    createdAt!: Date;

    //@ApiProperty({ description: 'Viagens do usuário' })
    //@OneToMany(() => Viagem, (viagem) => viagem.usuario)
    //viagens: Viagem[];
}