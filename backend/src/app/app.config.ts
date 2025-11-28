import { registerAs } from '@nestjs/config';
import { DatabaseType } from 'typeorm';

export default registerAs('app', () => ({
  database: {
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5433', 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    autoLoadEntities: Boolean(process.env.DATABASE_AUTO_LOAD_ENTITIES),
    synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
  },
}));
