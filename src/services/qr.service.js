const { Injectable } = require('@nestjs/common');
const { PrismaService } = require('./prisma.service');
const crypto = require('crypto');

@Injectable()
class QRService {
  constructor(prismaService) {
    this.prisma = prismaService;
  }

  async generateQRCode(userId) {
    const code = crypto.randomBytes(16).toString('hex');
    
    return this.prisma.qR.create({
      data: {
        code,
        userId,
      },
    });
  }

  async validateQRCode(code, userId) {
    const qrCode = await this.prisma.qR.findUnique({
      where: { code },
      include: { user: true },
    });

    if (!qrCode) {
      throw new Error('Invalid QR code');
    }

    // Check if user has already scanned this code
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { scannedCodes: true },
    });

    if (user.scannedCodes.includes(code)) {
      throw new Error('QR code already scanned');
    }

    // Add code to user's scanned codes
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        scannedCodes: {
          push: code,
        },
      },
    });

    return qrCode;
  }

  async getUserQRCodes(userId) {
    return this.prisma.qR.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteQRCode(id, userId) {
    return this.prisma.qR.delete({
      where: {
        id,
        userId,
      },
    });
  }
}

module.exports = { QRService };
