import { ApiProperty } from '@nestjs/swagger';
import { UploadProfilePicResponse } from '@users/uploads.types';

export const usersResponse = {
  id: '4350d040-9857-4e7d-929b-46baf8e38ba5',
  first_name: 'John',
  last_name: 'Doe',
  updated_at: '2023-09-23T16:06:41.641Z',
  phone: '+254712345678',
  email: 'johndoe@gmail.com',
  created_at: '2023-09-23T12:39:47.029Z',
};

export const userProfilesResponse = [usersResponse];

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
