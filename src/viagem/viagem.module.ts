import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Viagem } from './entities/viagem.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Viagem])],

    controllers: [],

    providers: [],

    exports: [TypeOrmModule,],
})
export class ViagemModule { }