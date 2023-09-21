import { Module } from '@nestjs/common';
import { EmailService } from '@email/email.service';
import { EmailController } from '@email/email.controller';
import { SupabaseModule } from '@/supabase/supabase.module';
import { EmailRepository } from '@email/email.repository';

@Module({
  imports: [SupabaseModule],
  providers: [EmailRepository, EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
