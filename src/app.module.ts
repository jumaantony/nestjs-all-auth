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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env/.env.${process.env.NODE_ENV || 'development'}`,
      load: [configurations],
      validationSchema: configurationsValidator,
    }),
    PhoneModule,
    SupabaseModule,
    EmailModule,
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
export class AppModule {}
