import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Email Authentication')
@Controller('email')
export class EmailController {}
