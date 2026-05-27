import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Vou Ali API')
    .setDescription('API para o projeto Vou Ali')
    .setVersion('1.0')
    .setContact('Assis', 'https://github.com/Lancellot', 'assis.pires.netors@gmail.com')
    .addTag('vou-ali')
    .build();
    

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
