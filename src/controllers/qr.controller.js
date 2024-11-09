import { Controller, Post, Body } from '@nestjs/common';
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
    return this.prisma.qR.create({
      data: {
        code,
        userId,
      },
    });
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
    return this.prisma.qR.findUnique({
      where: { code },
    });
  }
}

export const generateQR = QRController.prototype.generateQR;
export const scanQR = QRController.prototype.scanQR;
