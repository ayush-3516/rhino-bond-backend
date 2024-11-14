const { Injectable } = require('@nestjs/common');
const { PrismaService } = require('./prisma.service');

@Injectable()
class NotificationService {
  constructor(prismaService) {
    this.prisma = prismaService;
  }

  async createNotification(userId, message) {
    return this.prisma.notification.create({
      data: {
        userId,
        message,
      },
    });
  }

  async getUserNotifications(userId) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(notificationId, userId) {
    return this.prisma.notification.update({
      where: {
        id: notificationId,
        userId,
      },
      data: {
        read: true,
      },
    });
  }

  async markAllAsRead(userId) {
    return this.prisma.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
      },
    });
  }

  async deleteNotification(notificationId, userId) {
    return this.prisma.notification.delete({
      where: {
        id: notificationId,
        userId,
      },
    });
  }

  async getUnreadCount(userId) {
    return this.prisma.notification.count({
      where: {
        userId,
        read: false,
      },
    });
  }
}

module.exports = { NotificationService };
