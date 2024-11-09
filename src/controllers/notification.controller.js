import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('notifications')
export class NotificationController {
  constructor(prisma) {
    this.prisma = prisma;
  }

  /**
   * Retrieves all notifications.
   * @returns A list of all notifications.
   */
  @Get()
  async getNotifications() {
    console.log('Fetching all notifications');
    return this.prisma.notification.findMany();
  }

  /**
   * Marks a notification as read.
   * @param id - The ID of the notification to mark as read.
   * @param body - The body containing the read status.
   * @returns The updated notification object.
   */
  @Put(':id/read')
  async markAsRead(id, body) {
    console.log(`Marking notification with ID: ${id} as read`);
    const { read } = body;
    return this.prisma.notification.update({
      where: { id },
      data: { read },
    });
  }
}

export const getNotifications = NotificationController.prototype.getNotifications;
export const markAsRead = NotificationController.prototype.markAsRead;
