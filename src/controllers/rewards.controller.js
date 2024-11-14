import { Controller, Get, Post, Param, Body, BadRequestException } from '@nestjs/common';
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
    if (!name || !description || !pointsRequired) {
      throw new BadRequestException('Invalid reward details');
    }
    try {
      return await this.prisma.reward.create({
        data: {
          name,
          description,
          pointsRequired,
        },
      });
    } catch (error) {
      console.error('Error adding new reward', error);
      throw new BadRequestException('Invalid reward details');
    }
  }

  /**
   * Retrieves a specific reward by ID.
   * @param id - The ID of the reward to retrieve.
   * @returns The reward object.
   */
  @Get(':id')
  async getRewardById(id) {
    console.log(`Fetching reward with ID: ${id}`);
    try {
      return await this.prisma.reward.findUnique({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      console.error(`Error fetching reward with ID: ${id}`, error);
      throw new BadRequestException('Invalid reward ID');
    }
  }
}

export const getRewards = RewardsController.prototype.getRewards;
export const addReward = RewardsController.prototype.addReward;
export const getRewardById = RewardsController.prototype.getRewardById;
