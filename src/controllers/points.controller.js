import { Controller, Get, Post, Body } from '@nestjs/common';
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
    return this.prisma.points.create({
      data: {
        userId,
        points,
      },
    });
  }
}

export const getPoints = PointsController.prototype.getPoints;
export const addPoints = PointsController.prototype.addPoints;
