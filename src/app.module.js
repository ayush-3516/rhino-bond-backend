/**
 * @fileoverview Root module of the Rhino Bond backend application.
 * This module orchestrates all the components of the application including
 * controllers, services, and global configuration.
 * 
 * @module AppModule
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { PointsService } from './services/points.service';
import { NotificationService } from './services/notification.service';
import { QRService } from './services/qr.service';
import { RewardsService } from './services/rewards.service';
import { SupportService } from './services/support.service';
import { ProductService } from './services/product.service';
import { AuthController } from './controllers/auth.controller';
import { NotificationController } from './controllers/notification.controller';
import { PointsController } from './controllers/points.controller';
import { ProductController } from './controllers/product.controller';
import { QRController } from './controllers/qr.controller';
import { RewardsController } from './controllers/rewards.controller';
import { SupportController } from './controllers/support.controller';
import { UserController } from './controllers/user.controller';

/**
 * Root module of the application that brings together all components.
 * 
 * Features:
 * - Global configuration through ConfigModule
 * - Authentication and authorization
 * - User management
 * - Points and rewards system
 * - QR code functionality
 * - Product management
 * - Support system
 * - Notification system
 * 
 * @class AppModule
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes configuration globally available
    }),
  ],
  controllers: [
    AuthController,      // Handles authentication endpoints
    NotificationController, // Manages notifications
    PointsController,    // Manages points system
    ProductController,   // Handles product-related operations
    QRController,        // Manages QR code functionality
    RewardsController,   // Handles rewards system
    SupportController,   // Manages support tickets
    UserController,      // Handles user operations
  ],
  providers: [
    PrismaService,       // Database service
    AuthService,         // Authentication service
    UserService,         // User management service
    PointsService,       // Points system service
    NotificationService, // Notification service
    QRService,          // QR code service
    RewardsService,      // Rewards management service
    SupportService,      // Support ticket service
    ProductService,      // Product management service
  ],
})
export class AppModule {}
