import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhoneService } from '@phone/phone.service';
import { AuthCredentialsDto } from '@phone/dto/phone-credentials.dto';
import {
  PhoneResendOtpResponse,
  PhoneSignInResponse,
  PhoneSignUpResponse,
  PinResetResponse,
  VerifyPhoneResponse,
} from './phone-response-examples';
import { VerifyOtpDto } from '@phone/dto/verify-otp-dto';
import { ResendOtpDto } from '@phone/dto/resend-otp-dto';
import { ResetPinDto } from '@phone/dto/reset-pin.dto';

@ApiTags('Phone Authentication')
@Controller('phone')
export class PhoneController {
  constructor(private readonly _phoneService: PhoneService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up with phone number' })
  @ApiBody({ type: AuthCredentialsDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: PhoneSignUpResponse,
  })
  public async phoneNumberSignUp(@Body() body: any): Promise<any> {
    const { phoneNumber, PIN: password } = body;
    const response = await this._phoneService.phoneNumberSignUp(
      phoneNumber,
      password,
    );
    return response;
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify phone number' })
  @ApiBody({ type: VerifyOtpDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: VerifyPhoneResponse,
  })
  async phoneNumberVerifyOtp(@Body() body: any): Promise<any> {
    const { phoneNumber, otp } = body;
    const response = await this._phoneService.phoneNumberVerifyOtp(
      phoneNumber,
      otp,
    );
    return response;
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in with phone number' })
  @ApiBody({ type: AuthCredentialsDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: PhoneSignInResponse,
  })
  async phoneNumberSignIn(@Body() body: any): Promise<any> {
    const { phoneNumber, PIN: password } = body;
    const response = await this._phoneService.phoneNumberSignIn(
      phoneNumber,
      password,
    );
    return response;
  }

  @Post('resend-otp')
  @ApiOperation({ summary: 'Resend OTP' })
  @ApiBody({ type: ResendOtpDto })
  @ApiResponse({
    status: 201,
    description: 'Request to resend OTP was successful.',
    type: PhoneResendOtpResponse,
  })
  async resendOtp(@Body() body: ResendOtpDto) {
    const { phoneNumber } = body;
    const response = await this._phoneService.resendOtp(phoneNumber);
    return response;
  }

  @Patch('reset-pin')
  @ApiOperation({
    summary: 'Reset PIN by RESENDING a new OTP and providing the new PIN',
  })
  @ApiBody({ type: ResetPinDto })
  @ApiResponse({
    status: 200,
    description: 'PIN reset was successful.',
    type: PinResetResponse,
  })
  async resetPin(@Body() body: ResetPinDto) {
    const { phoneNumber, otp, PIN } = body;
    const response = await this._phoneService.resetPin(phoneNumber, otp, PIN);
    return response;
  }

  // @Patch('change-phone-number')
  // @ApiOperation({
  //   summary: 'Change phone number',
  // })
  // @ApiBody({ type: phoneNumberDto })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Phone number change was successful.',
  //   type: changePhoneNumberResponse,
  // })
  // @UseGuards(IsAuthenticatedUserGuard)
  // async changePhoneNumber(
  //   @Req() req: Request,
  //   @Body() body: phoneNumberDto,
  // ): Promise<changePhoneNumberResponse> {
  //   const id = req['userId'];
  //   const response = await this._phoneService.changePhoneNumber(
  //     body.phoneNumber,
  //     id,
  //   );
  //   return response;
  // }
}
