import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { ViagemModule } from './viagem/viagem.module';
import { CidadeModule } from './cidade/cidade.module';
import { ParadaModule } from './parada/parada.module';
import { AtividadeModule } from './atividade/atividade.module';
import { DespesaModule } from './despesa/despesa.module';
import { AuthModule } from './auth/auth.module';
import { ProdService } from './data/services/prod.service';


@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),

    UsuarioModule,
    ViagemModule,
    CidadeModule,
    ParadaModule,
    AtividadeModule,
    DespesaModule,
    AuthModule,
  ],

  controllers: [AppController],

  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}