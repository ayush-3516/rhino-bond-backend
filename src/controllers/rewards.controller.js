import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { RewardsService } from '../services/rewards.service';
import { CreateRewardDto, UpdateRewardDto, ClaimRewardDto } from '../dtos/rewards.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('rewards')
export class RewardsController {
  constructor(private rewardsService: RewardsService) {}

  @Get()
  async getAllRewards() {
    return this.rewardsService.getAllRewards();
  }

  @UseGuards(JwtAuthGuard)
  @Get('available')
  async getAvailableRewards(@Request() req) {
    return this.rewardsService.getAvailableRewards(req.user.id);
  }

  @Get(':id')
  async getReward(@Param('id') id) {
    return this.rewardsService.getReward(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  async createReward(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardsService.createReward(createRewardDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':id')
  async updateReward(@Param('id') id, @Body() updateRewardDto: UpdateRewardDto) {
    return this.rewardsService.updateReward(id, updateRewardDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  async deleteReward(@Param('id') id) {
    return this.rewardsService.deleteReward(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('claim')
  async claimReward(@Request() req, @Body() claimRewardDto: ClaimRewardDto) {
    return this.rewardsService.claimReward(req.user.id, claimRewardDto.rewardId);
  }
}

export const RewardsController = RewardsController;
