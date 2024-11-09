import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import {
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    prisma,
    jwtService,
    config,
  ) {
    this.prisma = prisma;
    this.jwtService = jwtService;
    this.config = config;

    // Initialize Firebase Admin
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: config.get('FIREBASE_PROJECT_ID'),
          clientEmail: config.get('FIREBASE_CLIENT_EMAIL'),
          privateKey: config.get('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
        }),
      });
    }
  }

  // Verify Firebase token and create/update user
  async verifyAndCreateUser(firebaseToken) {
    try {
      // Verify Firebase token
      const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
      const { uid, phone_number } = decodedToken;

      if (!phone_number) {
        throw new BadRequestException('Phone number not found in token');
      }

      // Find or create user
      let user = await this.prisma.user.findFirst({
        where: { 
          OR: [
            { firebaseUid: uid },
            { phoneNumber: phone_number }
          ]
        },
      });

      const isNewUser = !user;

      if (!user) {
        // Create new user
        user = await this.prisma.user.create({
          data: {
            firebaseUid: uid,
            phoneNumber: phone_number,
            email: '', // Add default email
            password: '', // Add default password
            otp: '', // Add default otp
            name: '', // Add default name
            address: '', // Add default address
            points: 0, // Add default points
            kycStatus: '', // Add default kycStatus
            scannedCodes: [], // Add default scannedCodes
            notifications: {
              create: [],
            },
            pointsRecords: {
              create: [],
            },
            qrCodes: {
              create: [],
            },
            supportTickets: {
              create: [],
            },
            refreshTokens: {
              create: [],
            },
            profile: null, // Add default profile
          },
        });
      } else if (user.firebaseUid !== uid) {
        // Update Firebase UID if phone number already exists but with different UID
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: { firebaseUid: uid },
        });
      }

      // Generate tokens
      const tokens = await this.generateTokens(user.id);

      return {
        ...tokens,
        isNewUser,
      };
    } catch (error) {
      if (error.code === 'auth/invalid-id-token') {
        throw new UnauthorizedException('Invalid Firebase token');
      }
      throw error;
    }
  }

  // Generate access and refresh tokens
  async generateTokens(userId) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId },
        {
          expiresIn: '15m',
          secret: this.config.get('JWT_ACCESS_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        { sub: userId },
        {
          expiresIn: '7d',
          secret: this.config.get('JWT_REFRESH_SECRET'),
        },
      ),
    ]);

    // Store refresh token
    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  // Refresh access token
  async refreshAccessToken(refreshToken) {
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const accessToken = await this.jwtService.signAsync(
      { sub: storedToken.userId },
      {
        expiresIn: '15m',
        secret: this.config.get('JWT_ACCESS_SECRET'),
      },
    );

    return { accessToken };
  }

  // Update user profile
  async updateProfile(
    userId,
    data, // Assign the error type to any
  ) {
    try {
      const profile = await this.prisma.profile.upsert({
        where: { userId },
        update: data,
        create: {
          ...data,
          userId,
        },
      });

      return profile;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  // Logout
  async logout(refreshToken) {
    await this.prisma.refreshToken.delete({
      where: { token: refreshToken },
    });
  }
}
