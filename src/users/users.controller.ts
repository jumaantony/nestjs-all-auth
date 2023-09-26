import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { IsAuthenticatedUserGuard } from '@common/guards/auth.guard';
import { Request } from 'express';
import { UpdateProfileDto } from '@users/dto/update-profile.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  uploadProfilePicResponse,
  userProfilesResponse,
  usersResponse,
} from '@users/user-response-examples';
import {
  ALLOWED_PROFILE_PHOTO_MIME_TYPES,
  MAX_UPLOAD_SIZE_IN_BYTES,
  PROFILE_PHOTO_STORAGE_BUCKET_NAME,
} from '@users/upload.constants';
import { UploadProfilePicValidator } from '@users/uploads.validators';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Get('user-profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'user profile retreived successfully.',
    content: {
      'application/json': {
        schema: {
          example: usersResponse,
        },
      },
    },
  })
  @UseGuards(IsAuthenticatedUserGuard)
  async getUserProfile(@Req() req: Request): Promise<UpdateProfileDto> {
    const userId: string = req['userId'];
    const response = await this._usersService.getUserProfile(userId);
    return response;
  }

  @Patch('user-profile')
  @ApiOperation({ summary: 'Update User Profile' })
  @ApiResponse({
    status: 200,
    description: 'user profile updated successfully.',
    content: {
      'application/json': {
        schema: {
          example: usersResponse,
        },
      },
    },
  })
  @UseGuards(IsAuthenticatedUserGuard)
  async updateUserProfile(
    @Req() req: Request,
    @Body() profile: UpdateProfileDto,
  ): Promise<UpdateProfileDto> {
    const userId: string = req['userId'];
    console.log('userId', userId);
    const response = await this._usersService.updateUserProfile(
      userId,
      profile,
    );
    return response;
  }

  @Get('all-users')
  @ApiOperation({ summary: 'Get users profiles' })
  @ApiResponse({
    status: 200,
    description: 'user profiles retreived successfully.',
    content: {
      'application/json': {
        schema: {
          example: userProfilesResponse,
        },
      },
    },
  })
  @UseGuards(IsAuthenticatedUserGuard)
  async getAllUsers(): Promise<UpdateProfileDto[]> {
    const response = await this._usersService.getAllUsers();
    return response;
  }

  /* 
    1. The method is also decorated with @UseInterceptors to use the FileInterceptor interceptor, which intercepts the 'profilePic' file from the request.
    2. The method receives the req object and the profilePic file as parameters.
    3. The req object is used to extract the user ID from the request headers.
    4. The profilePic file is passed to the ParseFilePipeBuilder to parse and validate the file.
    5. The UploadProfilePicValidator is added as a validator to check if the file type is allowed.
    6. The addMaxSizeValidator is used to check if the file size is within the allowed limit.
    7. The build method is called to build the pipe with the specified options.
    8. The uploadProfilePic method calls the uploadProfilePic method of the UsersService to handle the actual upload process.
  */
  @Post('upload-profile-pic')
  @ApiOperation({ summary: 'Upload Profile Picture' })
  @ApiResponse({
    status: 201,
    description: 'user profiles retreived successfully.',
    type: uploadProfilePicResponse,
  })
  @UseInterceptors(FileInterceptor('profilePic'))
  @UseGuards(IsAuthenticatedUserGuard)
  public async uploadProfilePic(
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(
          new UploadProfilePicValidator({
            fileType: ALLOWED_PROFILE_PHOTO_MIME_TYPES,
          }),
        )
        .addMaxSizeValidator({ maxSize: MAX_UPLOAD_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    profilePic: Express.Multer.File,
  ): Promise<uploadProfilePicResponse> {
    const userId: string = req['userId'];
    const response = await this._usersService.uploadProfilePic(
      userId,
      PROFILE_PHOTO_STORAGE_BUCKET_NAME,
      profilePic,
    );
    return response;
  }
}
