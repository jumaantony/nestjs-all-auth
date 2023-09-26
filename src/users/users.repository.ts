import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { profiles } from '@users/entity/users.entity';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '@supabase-module/supabase.service';
import { BaseException } from '@common/exceptions/base.exception';
import { compressFile } from '@users/uploads.helpers';
import { UploadProfilePicResponse } from '@users/uploads.types';

@Injectable()
export class UsersRepository extends Repository<profiles> {
  public _supabaseClient: SupabaseClient;

  constructor(
    private _DataSource: DataSource,
    private _supabaseClientFactory: SupabaseService,
  ) {
    super(profiles, _DataSource.createEntityManager());
    this._supabaseClient = _supabaseClientFactory.createClient();
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

  /* 
  1. The method takes the userId, storageBucketName, and file as inputs.
  2. It assigns the userId as the fileName for the uploaded image.
  3. It compresses the file using the compressFile function, with a maximum width of 800 pixels.
  4. It uploads the compressed file to the storage bucket using the Supabase client's upload method, 
    with additional options like cache control and content type.
  5. If there is an error during the upload, it throws a BaseException with the error message.
  6. It retrieves the public URL of the uploaded image using the Supabase client's getPublicUrl method.
 */
  public async uploadProfilePic(
    userId: string,
    storageBucketName: string,
    file: Express.Multer.File,
  ): Promise<UploadProfilePicResponse> {
    const fileName = userId;
    const compressedFileBuffer = await compressFile(file, 800);
    const { data, error } = await this._supabaseClient.storage
      .from(storageBucketName)
      .upload(fileName, compressedFileBuffer, {
        cacheControl: '3600',
        contentType: file.mimetype,
        upsert: true,
      });
    if (error) {
      throw new BaseException(error.message);
    }
    const { data: publicUrl } = this._supabaseClient.storage
      .from(storageBucketName)
      .getPublicUrl(data.path);
    const response = { ...data, ...publicUrl };
    return response;
  }
}
