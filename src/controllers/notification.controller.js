import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { CreateNotificationDto } from '../dtos/notification.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getUserNotifications(@Request() req) {
    return this.notificationService.getUserNotifications(req.user.id);
  }

  @Get(':id')
  async getNotification(@Request() req, @Param('id') id) {
    return this.notificationService.getNotification(id, req.user.id);
  }

  @UseGuards(AdminGuard)
  @Post()
  async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  @Delete(':id')
  async deleteNotification(@Request() req, @Param('id') id) {
    return this.notificationService.deleteNotification(id, req.user.id);
  }

  @Post(':id/read')
  async markAsRead(@Request() req, @Param('id') id) {
    return this.notificationService.markAsRead(id, req.user.id);
  }

  @UseGuards(AdminGuard)
  @Post('broadcast')
  async broadcastNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.broadcastNotification(createNotificationDto);
  }
}

export const getUserNotifications = NotificationController.prototype.getUserNotifications;
export const getNotification = NotificationController.prototype.getNotification;
export const createNotification = NotificationController.prototype.createNotification;
export const deleteNotification = NotificationController.prototype.deleteNotification;
export const markAsRead = NotificationController.prototype.markAsRead;
export const broadcastNotification = NotificationController.prototype.broadcastNotification;
