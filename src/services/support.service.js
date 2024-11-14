const { Injectable } = require('@nestjs/common');
const { PrismaService } = require('./prisma.service');
const { NotificationService } = require('./notification.service');

@Injectable()
class SupportService {
  constructor(prismaService, notificationService) {
    this.prisma = prismaService;
    this.notificationService = notificationService;
  }

  async createTicket(userId, data) {
    const ticket = await this.prisma.supportTicket.create({
      data: {
        ...data,
        userId,
      },
    });

    // Notify user that ticket was created
    await this.notificationService.createNotification(
      userId,
      `Support ticket #${ticket.id} has been created. We'll get back to you soon.`
    );

    return ticket;
  }

  async getUserTickets(userId) {
    return this.prisma.supportTicket.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTicket(id, userId) {
    return this.prisma.supportTicket.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async updateTicketStatus(id, userId, status) {
    const ticket = await this.prisma.supportTicket.update({
      where: {
        id,
        userId,
      },
      data: { status },
    });

    // Notify user about status change
    await this.notificationService.createNotification(
      userId,
      `Support ticket #${id} status has been updated to ${status}.`
    );

    return ticket;
  }

  async getAllTickets() {
    return this.prisma.supportTicket.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async respondToTicket(id, message, isStaff = false) {
    const ticket = await this.prisma.supportTicket.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    // Update ticket status
    await this.prisma.supportTicket.update({
      where: { id },
      data: {
        status: isStaff ? 'responded' : 'user_replied',
      },
    });

    // Notify user about the response
    if (isStaff) {
      await this.notificationService.createNotification(
        ticket.userId,
        `New response on your support ticket #${id}.`
      );
    }

    return ticket;
  }
}

module.exports = { SupportService };
