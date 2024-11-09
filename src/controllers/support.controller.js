import { Controller, Get, Post, Body } from '@nestjs/common';
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
    return this.prisma.supportTicket.create({
      data: {
        userId,
        subject,
        message,
      },
    });
  }
}

export const getSupportTickets = SupportController.prototype.getSupportTickets;
export const createSupportTicket = SupportController.prototype.createSupportTicket;
