import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@users/users.repository';
import { profiles } from '@users/entity/users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly _usersRepository: UsersRepository) {}

  async getUserProfile(userId: string): Promise<profiles> {
    return this._usersRepository.getUserProfile(userId);
  }

  async updateUserProfile(
    userId: string,
    profile: Partial<profiles>,
  ): Promise<profiles | null> {
    return this._usersRepository.updateUserProfile(userId, profile);
  }

  async getAllUsers(): Promise<profiles[]> {
    return this._usersRepository.getAllUsers();
  }
}
