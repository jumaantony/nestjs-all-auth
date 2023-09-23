import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { SupabaseModule } from '@supabase-module/supabase.module';
import {
  configurations,
  configurationsValidator,
} from '@common/config/configurations';
import { PhoneModule } from '@phone/phone.module';
import { EmailModule } from '@email/email.module';
import { UsersModule } from '@users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env/.env.${process.env.NODE_ENV || 'development'}`,
      load: [configurations],
      validationSchema: configurationsValidator,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SUPABASE_HOST,
      port: 5432,
      username: process.env.SUPABASE_USERNAME,
      password: process.env.SUPABASE_PASSWORD,
      database: process.env.SUPABASE_DATABASE,
      entities: [__dirname + './**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    PhoneModule,
    SupabaseModule,
    EmailModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
