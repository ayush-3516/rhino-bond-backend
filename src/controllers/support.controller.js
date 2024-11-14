import { Controller, Get, Post, Param, Body, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('support')
export class SupportController {
  constructor(prisma) {
    this.prisma = prisma;
  }

  /**
   * Retrieves all support tickets.
   * @returns A list of all support tickets.
   */
  @Get()
  async getSupportTickets() {
    console.log('Fetching all support tickets');
    return this.prisma.supportTicket.findMany();
  }

  /**
   * Creates a new support ticket.
   * @param body - The support ticket information to create.
   * @returns The newly created support ticket object.
   */
  @Post()
  async createSupportTicket(body) {
    console.log('Creating new support ticket');
    const { userId, subject, message } = body;
    if (!userId || !subject || !message) {
      throw new BadRequestException('Invalid support ticket details');
    }
    try {
      return await this.prisma.supportTicket.create({
        data: {
          userId,
          subject,
          message,
        },
      });
    } catch (error) {
      console.error('Error creating new support ticket', error);
      throw new BadRequestException('Invalid support ticket details');
    }
  }

  /**
   * Retrieves support tickets for a specific user.
   * @param userId - The ID of the user to retrieve support tickets for.
   * @returns A list of support tickets for the specified user.
   */
  @Get(':userId')
  async getSupportTicketsForUser(userId) {
    console.log(`Fetching support tickets for user with ID: ${userId}`);
    try {
      return await this.prisma.supportTicket.findMany({
        where: { userId },
      });
    } catch (error) {
      console.error(`Error fetching support tickets for user with ID: ${userId}`, error);
      throw new BadRequestException('Invalid user ID');
    }
  }
}

export const getSupportTickets = SupportController.prototype.getSupportTickets;
export const createSupportTicket = SupportController.prototype.createSupportTicket;
export const getSupportTicketsForUser = SupportController.prototype.getSupportTicketsForUser;
