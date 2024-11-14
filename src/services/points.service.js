/**
 * @fileoverview Service handling points-related business logic including points
 * transactions, balance management, and points history tracking.
 * 
 * @module PointsService
 * @requires @nestjs/common
 * @requires ./prisma.service
 */

const { Injectable, BadRequestException, NotFoundException } = require('@nestjs/common');
const { PrismaService } = require('./prisma.service');

/**
 * Service responsible for managing user points and related operations.
 * Handles point transactions, balance queries, and points history.
 */
@Injectable()
class PointsService {
  /**
   * Creates an instance of PointsService.
   * @param {PrismaService} prismaService - The Prisma database service
   */
  constructor(prismaService) {
    this.prisma = prismaService;
  }

  /**
   * Adds points to a user's balance and records the transaction.
   * 
   * @param {string} userId - The ID of the user receiving points
   * @param {number} points - The number of points to add (must be positive)
   * @param {string} reason - The reason for adding points
   * @throws {BadRequestException} If points value is invalid
   * @throws {NotFoundException} If user is not found
   * @returns {Promise<Object>} The created points record
   */
  async addPoints(userId, points, reason) {
    if (points <= 0) {
      throw new BadRequestException('Points must be a positive number');
    }

    try {
      const pointsRecord = await this.prisma.points.create({
        data: {
          userId,
          points,
          reason,
          type: 'EARNED'
        },
      });

      // Update user's total points
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          points: {
            increment: points
          }
        }
      });

      return pointsRecord;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  /**
   * Retrieves the points transaction history for a user.
   * 
   * @param {string} userId - The ID of the user
   * @returns {Promise<Array>} List of points transactions
   */
  async getPointsHistory(userId) {
    return this.prisma.points.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        points: true,
        type: true,
        reason: true,
        createdAt: true
      }
    });
  }

  /**
   * Gets the current points balance for a user.
   * 
   * @param {string} userId - The ID of the user
   * @returns {Promise<number>} The user's current points balance
   */
  async getUserPoints(userId) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { points: true }
    });
    return user?.points || 0;
  }

  /**
   * Deducts points from a user's balance and records the transaction.
   * 
   * @param {string} userId - The ID of the user
   * @param {number} points - The number of points to deduct (must be positive)
   * @param {string} reason - The reason for deducting points
   * @throws {BadRequestException} If points value is invalid or insufficient balance
   * @throws {NotFoundException} If user is not found
   * @returns {Promise<Object>} The created points record
   */
  async deductPoints(userId, points, reason) {
    if (points <= 0) {
      throw new BadRequestException('Points must be a positive number');
    }

    const currentPoints = await this.getUserPoints(userId);
    if (currentPoints < points) {
      throw new BadRequestException('Insufficient points balance');
    }

    try {
      const pointsRecord = await this.prisma.points.create({
        data: {
          userId,
          points: -points,
          reason,
          type: 'SPENT'
        },
      });

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          points: {
            decrement: points
          }
        }
      });

      return pointsRecord;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  /**
   * Retrieves the points leaderboard showing top users by points.
   * 
   * @param {number} limit - Maximum number of users to return (default: 10)
   * @returns {Promise<Array>} List of users with their points and ranks
   */
  async getLeaderboard(limit = 10) {
    const users = await this.prisma.user.findMany({
      orderBy: {
        points: 'desc'
      },
      take: limit,
      select: {
        id: true,
        username: true,
        points: true
      }
    });

    return users.map((user, index) => ({
      ...user,
      rank: index + 1
    }));
  }

  /**
   * Gets detailed points statistics for a user.
   * 
   * @param {string} userId - The ID of the user
   * @returns {Promise<Object>} User's points statistics
   */
  async getPointsStatistics(userId) {
    const [totalEarned, totalSpent, lastTransaction] = await Promise.all([
      this.prisma.points.aggregate({
        where: { 
          userId,
          type: 'EARNED'
        },
        _sum: {
          points: true
        }
      }),
      this.prisma.points.aggregate({
        where: { 
          userId,
          type: 'SPENT'
        },
        _sum: {
          points: true
        }
      }),
      this.prisma.points.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: {
          type: true,
          points: true,
          createdAt: true
        }
      })
    ]);

    const currentBalance = await this.getUserPoints(userId);

    // Calculate monthly statistics
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyStats = await this.prisma.$transaction([
      this.prisma.points.aggregate({
        where: { 
          userId,
          type: 'EARNED',
          createdAt: { gte: startOfMonth }
        },
        _sum: {
          points: true
        }
      }),
      this.prisma.points.aggregate({
        where: { 
          userId,
          type: 'SPENT',
          createdAt: { gte: startOfMonth }
        },
        _sum: {
          points: true
        }
      })
    ]);

    return {
      totalEarned: totalEarned._sum.points || 0,
      totalSpent: Math.abs(totalSpent._sum.points || 0),
      currentBalance,
      lastTransaction,
      monthlyStats: {
        earned: monthlyStats[0]._sum.points || 0,
        spent: Math.abs(monthlyStats[1]._sum.points || 0)
      }
    };
  }
}

module.exports = { PointsService };
