import { Module } from '@nestjs/common';
import { PhoneService } from '@phone/phone.service';
import { PhoneController } from '@phone/phone.controller';
import { PhoneRepository } from '@phone/phone.repository';
import { SupabaseModule } from '@supabase-module/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [PhoneRepository, PhoneService],
  controllers: [PhoneController],
})
export class PhoneModule {}
