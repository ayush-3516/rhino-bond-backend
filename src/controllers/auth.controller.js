import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  @Post('verify-and-create-user')
  async verifyAndCreateUser(loginUserDto) {
    return this.authService.verifyAndCreateUser(loginUserDto.firebaseToken);
  }

  @Post('refresh-access-token')
  async refreshAccessToken(refreshToken) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('update-profile')
  async updateProfile(userId, data) {
    return this.authService.updateProfile(userId, data);
  }

  @Post('logout')
  async logout(refreshToken) {
    return this.authService.logout(refreshToken);
  }
}
