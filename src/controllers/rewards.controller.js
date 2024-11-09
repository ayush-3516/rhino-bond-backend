import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('rewards')
export class RewardsController {
  constructor(prisma) {
    this.prisma = prisma;
  }

  /**
   * Retrieves all rewards.
   * @returns A list of all rewards.
   */
  @Get()
  async getRewards() {
    console.log('Fetching all rewards');
    return this.prisma.reward.findMany();
  }

  /**
   * Adds a new reward.
   * @param body - The reward information to add.
   * @returns The newly created reward object.
   */
  @Post()
  async addReward(body) {
    console.log('Adding new reward');
    const { name, description, pointsRequired } = body;
    return this.prisma.reward.create({
      data: {
        name,
        description,
        pointsRequired,
      },
    });
  }
}

export const getRewards = RewardsController.prototype.getRewards;
export const addReward = RewardsController.prototype.addReward;
