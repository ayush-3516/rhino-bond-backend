import { Controller, Get, Put, Post, Param, Body, BadRequestException } from '@nestjs/common';
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
    try {
      return await this.prisma.notification.update({
        where: { id: parseInt(id) },
        data: { read },
      });
    } catch (error) {
      console.error(`Error marking notification with ID: ${id} as read`, error);
      throw new BadRequestException('Invalid notification ID or read status');
    }
  }

  /**
   * Creates a new notification.
   * @param body - The body containing the notification details.
   * @returns The created notification object.
   */
  @Post()
  async createNotification(body) {
    console.log('Creating a new notification');
    const { title, message } = body;
    try {
      return await this.prisma.notification.create({
        data: { title, message, read: false },
      });
    } catch (error) {
      console.error('Error creating notification', error);
      throw new BadRequestException('Invalid notification details');
    }
  }
}

export const getNotifications = NotificationController.prototype.getNotifications;
export const markAsRead = NotificationController.prototype.markAsRead;
export const createNotification = NotificationController.prototype.createNotification;
