import { Module } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { UsersRepository } from '@users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { profiles } from '@users/entity/users.entity';
import { UsersController } from '@users/users.controller';
import { SupabaseService } from '@/supabase/supabase.service';
@Module({
  imports: [TypeOrmModule.forFeature([profiles])],
  providers: [UsersService, UsersRepository, SupabaseService],
  controllers: [UsersController],
})
export class UsersModule {}
