import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log']
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  const config = new DocumentBuilder()
    .setTitle('Retail City')
    .setDescription('Endpoints for retail city')
    .setVersion('1.0')
    .addTag('r.c')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apis', app, document);
  Logger.log(`Application listening on PORT : ${process.env.PORT}`)
  await app.listen(process.env.PORT);

}
bootstrap();
