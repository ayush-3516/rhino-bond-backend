import { Controller, Get, Post, Param, Body, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('qr')
export class QRController {
  constructor(prisma) {
    this.prisma = prisma;
  }

  /**
   * Generates a new QR code.
   * @param body - The body containing the code and user ID.
   * @returns The newly created QR code object.
   */
  @Post('generate')
  async generateQR(body) {
    console.log('Generating new QR code');
    const { code, userId } = body;
    if (!code || !userId) {
      throw new BadRequestException('Invalid QR code details');
    }
    try {
      return await this.prisma.qR.create({
        data: {
          code,
          userId,
        },
      });
    } catch (error) {
      console.error('Error generating new QR code', error);
      throw new BadRequestException('Invalid QR code details');
    }
  }

  /**
   * Scans a QR code.
   * @param body - The body containing the code to scan.
   * @returns The QR code object if found.
   */
  @Post('scan')
  async scanQR(body) {
    console.log('Scanning QR code');
    const { code } = body;
    if (!code) {
      throw new BadRequestException('Invalid QR code');
    }
    try {
      return await this.prisma.qR.findUnique({
        where: { code },
      });
    } catch (error) {
      console.error('Error scanning QR code', error);
      throw new BadRequestException('Invalid QR code');
    }
  }

  /**
   * Retrieves all QR codes for a specific user.
   * @param userId - The ID of the user to retrieve QR codes for.
   * @returns A list of QR codes for the specified user.
   */
  @Get(':userId')
  async getQRCodesForUser(userId) {
    console.log(`Fetching QR codes for user with ID: ${userId}`);
    try {
      return await this.prisma.qR.findMany({
        where: { userId },
      });
    } catch (error) {
      console.error(`Error fetching QR codes for user with ID: ${userId}`, error);
      throw new BadRequestException('Invalid user ID');
    }
  }
}

export const generateQR = QRController.prototype.generateQR;
export const scanQR = QRController.prototype.scanQR;
export const getQRCodesForUser = QRController.prototype.getQRCodesForUser;
