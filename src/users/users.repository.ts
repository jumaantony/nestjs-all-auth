import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { profiles } from '@users/entity/users.entity';

@Injectable()
export class UsersRepository extends Repository<profiles> {
  constructor(private _DataSource: DataSource) {
    super(profiles, _DataSource.createEntityManager());
  }

  public async getUserProfile(userId: string): Promise<profiles> {
    const id = userId;
    const user = await this.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  public async updateUserProfile(
    userId: string,
    profile: Partial<profiles>,
  ): Promise<profiles | null> {
    const user = await this.getUserProfile(userId);

    Object.assign(user, profile);
    user.updated_at = new Date();
    await this.save(user);
    return user;
  }

  public async getAllUsers(): Promise<profiles[]> {
    return this.find();
  }
}
