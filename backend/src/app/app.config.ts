import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  database: {
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5433', 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    autoLoadEntities: Boolean(Number(process.env.DATABASE_AUTO_LOAD_ENTITIES)),
    synchronize: Boolean(Number(process.env.DATABASE_SYNCHRONIZE)),
    dropSchema: Boolean(Number(process.env.DATABASE_DROP_SCHEMA)),
  },
}));
