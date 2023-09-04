import { Module } from '@nestjs/common';
import { PhoneService } from '@phone/phone.service';
import { PhoneController } from '@phone/phone.controller';

@Module({
  providers: [PhoneService],
  controllers: [PhoneController],
})
export class PhoneModule {}
