import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({ name: 'tb_cidades' })
export class Cidade {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100, nullable: false })
    nome!: string;

    @Column({ length: 100, nullable: true })
    estado!: string;

    @Column({ length: 100, nullable: true })
    pais!: string;

    //@OneToMany(() => Parada, (parada) => parada.cidade)
    //paradas!: Parada[];
}