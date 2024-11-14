import { Controller, Get, Post, Param, Body, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('points')
export class PointsController {
  constructor(prisma) {
    this.prisma = prisma;
  }

  /**
   * Retrieves all points records.
   * @returns A list of all points records.
   */
  @Get()
  async getPoints() {
    console.log('Fetching all points records');
    return this.prisma.points.findMany();
  }

  /**
   * Adds points to a user.
   * @param body - The body containing the user ID and points to add.
   * @returns The newly created points record.
   */
  @Post()
  async addPoints(body) {
    console.log('Adding points to user');
    const { userId, points } = body;
    if (!userId || !points) {
      throw new BadRequestException('Invalid user ID or points');
    }
    try {
      return await this.prisma.points.create({
        data: {
          userId,
          points,
        },
      });
    } catch (error) {
      console.error('Error adding points to user', error);
      throw new BadRequestException('Invalid user ID or points');
    }
  }

  /**
   * Retrieves points for a specific user.
   * @param userId - The ID of the user to retrieve points for.
   * @returns The points record for the specified user.
   */
  @Get(':userId')
  async getPointsForUser(userId) {
    console.log(`Fetching points for user with ID: ${userId}`);
    try {
      return await this.prisma.points.findMany({
        where: { userId },
      });
    } catch (error) {
      console.error(`Error fetching points for user with ID: ${userId}`, error);
      throw new BadRequestException('Invalid user ID');
    }
  }
}

export const getPoints = PointsController.prototype.getPoints;
export const addPoints = PointsController.prototype.addPoints;
export const getPointsForUser = PointsController.prototype.getPointsForUser;
