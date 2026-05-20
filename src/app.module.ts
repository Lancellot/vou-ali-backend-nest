import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { DevService } from './data/services/dev.service';
import { ViagemModule } from './viagem/viagem.module';
import { CidadeModule } from './cidade/cidade.module';


@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
      useClass: DevService,
      imports: [ConfigModule],
    }),

    UsuarioModule,
    ViagemModule,
    CidadeModule,
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