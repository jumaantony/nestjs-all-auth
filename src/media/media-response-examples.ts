import { ApiProperty } from '@nestjs/swagger';
import { UploadProfilePicResponse } from '@media/media.types';

export class uploadProfilePicResponse implements UploadProfilePicResponse {
  @ApiProperty({
    example: '4350d040-9857-4e7d-929b-46baf8e38ba5',
  })
  path: string;

  @ApiProperty({
    example:
      'https://bgatoqpmayzpmhsblfon.supabase.co/storage/v1/object/public/profile_photos/4350d040-9857-4e7d-929b-46baf8e38ba5',
  })
  publicUrl: string;
}
