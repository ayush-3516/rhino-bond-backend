const { Injectable } = require('@nestjs/common');
const { PrismaService } = require('./prisma.service');
const bcrypt = require('bcrypt');

@Injectable()
class UserService {
  constructor(prismaService) {
    this.prisma = prismaService;
  }

  async createUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        points: 0,
        scannedCodes: [],
      },
    });
  }

  async getUser(id) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
      },
    });
  }

  async getUserByEmail(email) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });
  }

  async getUserByFirebaseUid(firebaseUid) {
    return this.prisma.user.findUnique({
      where: { firebaseUid },
      include: {
        profile: true,
      },
    });
  }

  async updateUser(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        profile: true,
      },
    });
  }

  async updateProfile(userId, profileData) {
    return this.prisma.profile.upsert({
      where: {
        userId,
      },
      update: profileData,
      create: {
        ...profileData,
        userId,
      },
    });
  }

  async updateKycStatus(userId, kycStatus) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { kycStatus },
    });
  }

  async deleteUser(id) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  }

  async getUserStats(userId) {
    const user = await this.getUser(userId);
    const scannedCodesCount = user.scannedCodes.length;
    const points = user.points;

    return {
      scannedCodesCount,
      points,
      kycStatus: user.kycStatus,
    };
  }
}

module.exports = { UserService };
