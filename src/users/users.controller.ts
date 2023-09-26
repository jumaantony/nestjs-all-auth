import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { IsAuthenticatedUserGuard } from '@common/guards/auth.guard';
import { Request } from 'express';
import { UpdateProfileDto } from '@users/dto/update-profile.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  userProfilesResponse,
  usersResponse,
} from '@users/user-response-examples';

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
}
