const { Injectable } = require('@nestjs/common');
const { PrismaService } = require('./prisma.service');
const { PointsService } = require('./points.service');

@Injectable()
class RewardsService {
  constructor(prismaService, pointsService) {
    this.prisma = prismaService;
    this.pointsService = pointsService;
  }

  async createReward(data) {
    return this.prisma.reward.create({
      data,
    });
  }

  async getAllRewards() {
    return this.prisma.reward.findMany({
      orderBy: { pointsRequired: 'asc' },
    });
  }

  async getReward(id) {
    return this.prisma.reward.findUnique({
      where: { id },
    });
  }

  async updateReward(id, data) {
    return this.prisma.reward.update({
      where: { id },
      data,
    });
  }

  async deleteReward(id) {
    return this.prisma.reward.delete({
      where: { id },
    });
  }

  async claimReward(userId, rewardId) {
    const reward = await this.getReward(rewardId);
    if (!reward) {
      throw new Error('Reward not found');
    }

    // Check if user has enough points
    const userPoints = await this.pointsService.getUserPoints(userId);
    if (userPoints < reward.pointsRequired) {
      throw new Error('Insufficient points');
    }

    // Deduct points from user
    await this.pointsService.deductPoints(userId, reward.pointsRequired);

    // TODO: Implement reward delivery logic here
    // This could involve generating a code, sending an email, etc.

    return reward;
  }

  async getAvailableRewards(userId) {
    const userPoints = await this.pointsService.getUserPoints(userId);
    const rewards = await this.getAllRewards();

    return rewards.map(reward => ({
      ...reward,
      available: userPoints >= reward.pointsRequired,
    }));
  }
}

module.exports = { RewardsService };
