import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { IsAuthenticatedUserGuard } from '@common/guards/auth.guard';
import { Request } from 'express';
import { UpdateProfileDto } from '@users/dto/update-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Get('user-profile')
  @UseGuards(IsAuthenticatedUserGuard)
  async getUserProfile(@Req() req: Request): Promise<UpdateProfileDto> {
    const userId: string = req['userId'];
    const response = await this._usersService.getUserProfile(userId);
    return response;
  }

  @Patch('user-profile')
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
  @UseGuards(IsAuthenticatedUserGuard)
  async getAllUsers(): Promise<UpdateProfileDto[]> {
    const response = await this._usersService.getAllUsers();
    return response;
  }
}
