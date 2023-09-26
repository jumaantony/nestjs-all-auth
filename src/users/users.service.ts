import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@users/users.repository';
import { profiles } from '@users/entity/users.entity';
import { UploadProfilePicResponse } from '@users/uploads.types';

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

  async uploadProfilePic(
    userId: string,
    storageBucketName: string,
    file: Express.Multer.File,
  ): Promise<UploadProfilePicResponse> {
    const response = await this._usersRepository.uploadProfilePic(
      userId,
      storageBucketName,
      file,
    );
    return response;
  }
}
