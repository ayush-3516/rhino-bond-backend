/**
 * @fileoverview User management controller handling all user-related operations
 * including profile management, KYC verification, and administrative functions.
 * 
 * @module UserController
 * @requires @nestjs/common
 * @requires @nestjs/swagger
 */

const { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } = require('@nestjs/common');
const { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } = require('@nestjs/swagger');
const { UserService } = require('../services/user.service');
const { UpdateProfileDto, UpdateKYCStatusDto } = require('../dtos/user.dto');
const { JwtAuthGuard } = require('../guards/jwt-auth.guard');
const { AdminGuard } = require('../guards/admin.guard');

/**
 * Controller handling all user-related operations.
 * Protected by JwtAuthGuard for authenticated access.
 * Some endpoints require AdminGuard for administrative access.
 * 
 * @class UserController
 */
@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Retrieves the authenticated user's profile.
   * 
   * @param {Request} req - Request object containing user ID
   * @returns {Promise<Object>} User profile data
   */
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ 
    status: 200, 
    description: 'User profile retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
        profilePicture: { type: 'string' },
        kycStatus: { type: 'string' },
        role: { type: 'string' }
      }
    }
  })
  async getProfile(@Request() req) {
    return this.userService.getUserProfile(req.user.id);
  }

  /**
   * Updates the authenticated user's profile.
   * 
   * @param {Request} req - Request object containing user ID
   * @param {UpdateProfileDto} updateProfileDto - Updated profile data
   * @returns {Promise<Object>} Updated user profile
   */
  @Put('profile')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid profile data' })
  async updateProfile(@Request() req, @Body() updateProfileDto) {
    return this.userService.updateProfile(req.user.id, updateProfileDto);
  }

  /**
   * Retrieves the authenticated user's KYC status.
   * 
   * @param {Request} req - Request object containing user ID
   * @returns {Promise<Object>} User's KYC status
   */
  @Get('kyc-status')
  @ApiOperation({ summary: 'Get user KYC status' })
  @ApiResponse({ 
    status: 200, 
    description: 'KYC status retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['PENDING', 'VERIFIED', 'REJECTED'] },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    }
  })
  async getKYCStatus(@Request() req) {
    return this.userService.getKYCStatus(req.user.id);
  }

  /**
   * Updates a user's KYC status (Admin only).
   * 
   * @param {string} id - User ID
   * @param {UpdateKYCStatusDto} updateKYCStatusDto - Updated KYC status
   * @returns {Promise<Object>} Updated KYC status
   */
  @UseGuards(AdminGuard)
  @Put(':id/kyc-status')
  @ApiOperation({ summary: 'Update user KYC status (Admin)' })
  @ApiResponse({ status: 200, description: 'KYC status updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  async updateKYCStatus(@Param('id') id, @Body() updateKYCStatusDto) {
    return this.userService.updateKYCStatus(id, updateKYCStatusDto.status);
  }

  /**
   * Retrieves all users (Admin only).
   * 
   * @returns {Promise<Array>} List of all users
   */
  @UseGuards(AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Get all users (Admin)' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  /**
   * Retrieves a specific user by ID (Admin only).
   * 
   * @param {string} id - User ID to retrieve
   * @returns {Promise<Object>} User data
   */
  @UseGuards(AdminGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID (Admin)' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('id') id) {
    return this.userService.getUserById(id);
  }

  /**
   * Deletes a user (Admin only).
   * 
   * @param {string} id - User ID to delete
   * @returns {Promise<Object>} Deleted user data
   */
  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user (Admin)' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Param('id') id) {
    return this.userService.deleteUser(id);
  }

  /**
   * Retrieves user statistics.
   * 
   * @param {Request} req - Request object containing user ID
   * @returns {Promise<Object>} User statistics
   */
  @Get('statistics')
  @ApiOperation({ summary: 'Get user statistics' })
  @ApiResponse({ 
    status: 200, 
    description: 'Statistics retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        points: { type: 'number' },
        challenges: { type: 'number' },
        rewards: { type: 'number' },
        referrals: { type: 'number' }
      }
    }
  })
  async getUserStatistics(@Request() req) {
    return this.userService.getUserStatistics(req.user.id);
  }

  /**
   * Updates a user's role (Admin only).
   * 
   * @param {string} id - User ID to update
   * @param {string} role - New role to assign
   * @returns {Promise<Object>} Updated user data
   */
  @UseGuards(AdminGuard)
  @Put(':id/role')
  @ApiOperation({ summary: 'Update user role (Admin)' })
  @ApiResponse({ status: 200, description: 'Role updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  async updateUserRole(@Param('id') id, @Body('role') role) {
    return this.userService.updateUserRole(id, role);
  }
}

module.exports = { UserController };
