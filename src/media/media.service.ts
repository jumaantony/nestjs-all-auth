import { Injectable } from '@nestjs/common';
import { MediaRepository } from '@media/media.repository';
import { UploadProfilePicResponse } from '@media/media.types';

@Injectable()
export class MediaService {
  constructor(private readonly _mediaRepository: MediaRepository) {}

  async uploadProfilePic(
    userId: string,
    storageBucketName: string,
    file: Express.Multer.File,
  ): Promise<UploadProfilePicResponse> {
    const response = await this._mediaRepository.uploadProfilePic(
      userId,
      storageBucketName,
      file,
    );
    return response;
  }
}
