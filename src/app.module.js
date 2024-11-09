import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthController } from './controllers/auth.controller';
import { NotificationController } from './controllers/notification.controller';
import { PointsController } from './controllers/points.controller';
import { ProductController } from './controllers/product.controller';
import { QRController } from './controllers/qr.controller';
import { RewardsController } from './controllers/rewards.controller';
import { SupportController } from './controllers/support.controller';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [],
  controllers: [
    AuthController,
    NotificationController,
    PointsController,
    ProductController,
    QRController,
    RewardsController,
    SupportController,
    UserController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
