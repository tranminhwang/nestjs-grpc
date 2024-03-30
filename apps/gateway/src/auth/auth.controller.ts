import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordLoginDto, RegisterDto } from './dto';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: PasswordLoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return user;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return registerDto;
  }
}
