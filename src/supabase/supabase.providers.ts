import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';

export const supabaseProviders = [
  {
    provide: 'SUPABASE_CONNECTION',
    useFactory: async (logger: Logger) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.SUPABASE_HOST,
        port: 5432,
        username: process.env.SUPABASE_USERNAME,
        password: process.env.SUPABASE_PASSWORD,
        database: process.env.SUPABASE_DATABASE,
        entities: [],
        synchronize: true,
      });
      await dataSource
        .initialize()
        .then(() => logger.log('Connection to Supabase database established'))
        .catch((err) =>
          logger.error('Error connecting to Supabase database', err),
        );
    },
    inject: [Logger],
  },
];