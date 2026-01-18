import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { parseCorsWhitelist } from './common/utils/parse-cors-whitelist';
import { CategorySeedService } from './category/category-seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const categorySeedService = app.get(CategorySeedService);

  await categorySeedService.seedDefaultCategories();

  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

  const corsWhitelist = parseCorsWhitelist(process.env.CORS_WHITELIST || '');

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (...args: any[]) => void,
    ) => {
      if (!origin || corsWhitelist.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
  });

  const documentBuildConfig = new DocumentBuilder()
    .setTitle('Conta Certa - API')
    .setDescription(
      'Registre suas transações financeiras e veja como seu dinheiro está sendo utilizado.',
    )
    .setVersion('0.01')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, documentBuildConfig);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.BACKEND_PORT ?? 3001);
}
bootstrap().catch((err) => console.error(err));
