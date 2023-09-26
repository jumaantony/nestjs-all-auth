import { BaseException } from '@common/exceptions/base.exception';
import { SupabaseService } from '@/supabase/supabase.service';
import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { compressFile } from '@media/media.helpers';
import { UploadProfilePicResponse } from '@media/media.types';

@Injectable()
export class MediaRepository {
  public _supabaseClient: SupabaseClient;

  constructor(private _supabaseClientFactory: SupabaseService) {
    this._supabaseClient = _supabaseClientFactory.createClient();
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
