/**
 * @fileoverview Points management controller handling all points-related operations
 * including balance queries, point transactions, and leaderboard functionality.
 * 
 * @module PointsController
 * @requires @nestjs/common
 * @requires @nestjs/swagger
 */

import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PointsService } from '../services/points.service';
import { AddPointsDto, DeductPointsDto } from '../dtos/points.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

/**
 * Controller handling all points-related operations.
 * Protected by JwtAuthGuard for authenticated access.
 * Some endpoints require AdminGuard for administrative access.
 * 
 * @class PointsController
 */
@ApiTags('Points')
@Controller('points')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  /**
   * Retrieves the current points balance for the authenticated user.
   * 
   * @param {Request} req - Request object containing user ID
   * @returns {Promise<Object>} Current points balance
   */
  @Get('balance')
  @ApiOperation({ summary: 'Get user points balance' })
  @ApiResponse({ 
    status: 200, 
    description: 'Points balance retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        balance: { type: 'number' },
        lastUpdated: { type: 'string', format: 'date-time' }
      }
    }
  })
  async getPointsBalance(@Request() req) {
    return this.pointsService.getPointsBalance(req.user.id);
  }

  /**
   * Retrieves the points transaction history for the authenticated user.
   * 
   * @param {Request} req - Request object containing user ID
   * @returns {Promise<Array>} List of points transactions
   */
  @Get('history')
  @ApiOperation({ summary: 'Get points transaction history' })
  @ApiResponse({ 
    status: 200, 
    description: 'Points history retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          type: { type: 'string', enum: ['EARNED', 'SPENT', 'REFUNDED'] },
          points: { type: 'number' },
          reason: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' }
        }
      }
    }
  })
  async getPointsHistory(@Request() req) {
    return this.pointsService.getPointsHistory(req.user.id);
  }

  /**
   * Adds points to a user's balance (Admin only).
   * 
   * @param {AddPointsDto} addPointsDto - Points addition data
   * @returns {Promise<Object>} Updated points balance
   */
  @UseGuards(AdminGuard)
  @Post('add')
  @ApiOperation({ summary: 'Add points to user (Admin)' })
  @ApiResponse({ status: 200, description: 'Points added successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  @ApiResponse({ status: 400, description: 'Invalid points data' })
  async addPoints(@Body() addPointsDto: AddPointsDto) {
    return this.pointsService.addPoints(
      addPointsDto.userId, 
      addPointsDto.points, 
      addPointsDto.reason
    );
  }

  /**
   * Deducts points from a user's balance (Admin only).
   * 
   * @param {DeductPointsDto} deductPointsDto - Points deduction data
   * @returns {Promise<Object>} Updated points balance
   */
  @UseGuards(AdminGuard)
  @Post('deduct')
  @ApiOperation({ summary: 'Deduct points from user (Admin)' })
  @ApiResponse({ status: 200, description: 'Points deducted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  @ApiResponse({ status: 400, description: 'Invalid points data or insufficient balance' })
  async deductPoints(@Body() deductPointsDto: DeductPointsDto) {
    return this.pointsService.deductPoints(
      deductPointsDto.userId, 
      deductPointsDto.points, 
      deductPointsDto.reason
    );
  }

  /**
   * Retrieves the global points leaderboard.
   * 
   * @returns {Promise<Array>} List of top users by points
   */
  @Get('leaderboard')
  @ApiOperation({ summary: 'Get points leaderboard' })
  @ApiResponse({ 
    status: 200, 
    description: 'Leaderboard retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
          username: { type: 'string' },
          points: { type: 'number' },
          rank: { type: 'number' }
        }
      }
    }
  })
  async getLeaderboard() {
    return this.pointsService.getLeaderboard();
  }

  /**
   * Retrieves points statistics for the authenticated user.
   * 
   * @param {Request} req - Request object containing user ID
   * @returns {Promise<Object>} Points statistics
   */
  @Get('statistics')
  @ApiOperation({ summary: 'Get user points statistics' })
  @ApiResponse({ 
    status: 200, 
    description: 'Statistics retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        totalEarned: { type: 'number' },
        totalSpent: { type: 'number' },
        currentBalance: { type: 'number' },
        lastTransaction: { 
          type: 'object',
          properties: {
            type: { type: 'string' },
            points: { type: 'number' },
            timestamp: { type: 'string', format: 'date-time' }
          }
        },
        monthlyStats: {
          type: 'object',
          properties: {
            earned: { type: 'number' },
            spent: { type: 'number' }
          }
        }
      }
    }
  })
  async getPointsStatistics(@Request() req) {
    return this.pointsService.getPointsStatistics(req.user.id);
  }
}

export const PointsController;
