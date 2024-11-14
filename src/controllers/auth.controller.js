/**
 * @fileoverview Authentication controller handling all auth-related operations
 * including registration, login, token management, and password operations.
 * 
 * @module AuthController
 * @requires @nestjs/common
 * @requires @nestjs/swagger
 */

import { Controller, Post, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto, ResetPasswordDto, ChangePasswordDto } from '../dtos/auth.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

/**
 * Controller handling all authentication-related endpoints.
 * Provides functionality for user registration, login, token management,
 * and password operations.
 * 
 * @class AuthController
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Register a new user in the system.
   * 
   * @param {RegisterDto} registerDto - User registration data
   * @returns {Promise<Object>} Newly created user data and tokens
   */
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully registered',
    schema: {
      type: 'object',
      properties: {
        user: { type: 'object' },
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid registration data' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Authenticate a user and provide access tokens.
   * 
   * @param {LoginDto} loginDto - User login credentials
   * @returns {Promise<Object>} Authentication tokens and user data
   * @throws {UnauthorizedException} If credentials are invalid
   */
  @Post('login')
  @ApiOperation({ summary: 'Authenticate user and get tokens' })
  @ApiResponse({ 
    status: 200, 
    description: 'User successfully authenticated',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
        user: { type: 'object' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return result;
  }

  /**
   * Log out a user and invalidate their tokens.
   * 
   * @param {Request} req - Request object containing user data
   * @returns {Promise<Object>} Logout confirmation
   */
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Log out user and invalidate tokens' })
  @ApiResponse({ status: 200, description: 'User successfully logged out' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(@Request() req) {
    return this.authService.logout(req.user.id);
  }

  /**
   * Refresh an expired access token using a valid refresh token.
   * 
   * @param {RefreshTokenDto} refreshTokenDto - Refresh token data
   * @returns {Promise<Object>} New access and refresh tokens
   * @throws {UnauthorizedException} If refresh token is invalid
   */
  @Post('refresh-token')
  @ApiOperation({ summary: 'Get new access token using refresh token' })
  @ApiResponse({ 
    status: 200, 
    description: 'Tokens successfully refreshed',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const result = await this.authService.refreshToken(refreshTokenDto.refreshToken);
    if (!result) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return result;
  }

  /**
   * Verify a user's email address using a verification token.
   * 
   * @param {string} token - Email verification token
   * @returns {Promise<Object>} Verification confirmation
   */
  @Post('verify-email')
  @ApiOperation({ summary: 'Verify user email address' })
  @ApiResponse({ status: 200, description: 'Email successfully verified' })
  @ApiResponse({ status: 400, description: 'Invalid verification token' })
  async verifyEmail(@Body('token') token) {
    return this.authService.verifyEmail(token);
  }

  /**
   * Initiate the password reset process for a user.
   * 
   * @param {string} email - User's email address
   * @returns {Promise<Object>} Confirmation of reset email sent
   */
  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset email' })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  async forgotPassword(@Body('email') email) {
    return this.authService.forgotPassword(email);
  }

  /**
   * Reset a user's password using a reset token.
   * 
   * @param {ResetPasswordDto} resetPasswordDto - Password reset data
   * @returns {Promise<Object>} Password reset confirmation
   */
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password using token' })
  @ApiResponse({ status: 200, description: 'Password successfully reset' })
  @ApiResponse({ status: 400, description: 'Invalid reset token' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword
    );
  }

  /**
   * Change a user's password while authenticated.
   * 
   * @param {Request} req - Request object containing user data
   * @param {ChangePasswordDto} changePasswordDto - Password change data
   * @returns {Promise<Object>} Password change confirmation
   */
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200, description: 'Password successfully changed' })
  @ApiResponse({ status: 401, description: 'Invalid current password' })
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(
      req.user.id,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword
    );
  }
}
