import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentBuildConfig = new DocumentBuilder()
    .setTitle('Conta Certa - API')
    .setDescription(
      'Registre suas transações financeiras e veja como seu dinheiro está sendo utilizado.',
    )
    .setVersion('0.01')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuildConfig);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.BACKEND_PORT ?? 3001);
}
bootstrap().catch((err) => console.error(err));
