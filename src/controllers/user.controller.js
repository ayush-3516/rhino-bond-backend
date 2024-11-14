const { Controller, Get, Post, Put, Body, Param, BadRequestException } = require('@nestjs/common');
const { PrismaService } = require('../services/prisma.service');
const bcrypt = require('bcrypt');

class UserController {
  constructor(prisma) {
    this.prisma = prisma;
  }

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user to retrieve.
   * @returns The user object if found.
   */
  @Get(':id')
  async getUser(id) {
    console.log(`Fetching user with ID: ${id}`);
    try {
      return await this.prisma.user.findUnique({ where: { id: parseInt(id) } });
    } catch (error) {
      console.error(`Error fetching user with ID: ${id}`, error);
      throw new BadRequestException('Invalid user ID');
    }
  }

  /**
   * Updates a user's information.
   * @param id - The ID of the user to update.
   * @param body - The updated user information.
   * @returns The updated user object.
   */
  @Put(':id')
  async updateUser(id, body) {
    console.log(`Updating user with ID: ${id}`);
    const { email, password, phoneNumber, otp, name, address, points, kycStatus } = body;
    if (!email || !password || !phoneNumber || !otp || !name || !address || !points || !kycStatus) {
      throw new BadRequestException('Invalid user details');
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return await this.prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          email,
          password: hashedPassword,
          phoneNumber,
          otp,
          name,
          address,
          points,
          kycStatus,
        },
      });
    } catch (error) {
      console.error(`Error updating user with ID: ${id}`, error);
      throw new BadRequestException('Invalid user details');
    }
  }

  /**
   * Registers a new user.
   * @param body - The user information for registration.
   * @returns The newly created user object.
   */
  @Post('register')
  async registerUser(body) {
    console.log('Registering new user');
    const { email, password, phoneNumber, otp, name, address, points, kycStatus } = body;
    if (!email || !password || !phoneNumber || !otp || !name || !address || !points || !kycStatus) {
      throw new BadRequestException('Invalid user details');
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          phoneNumber,
          otp,
          name,
          address,
          points,
          kycStatus,
        },
      });
    } catch (error) {
      console.error('Error registering new user', error);
      throw new BadRequestException('Invalid user details');
    }
  }

  /**
   * Retrieves all users.
   * @returns A list of all users.
   */
  @Get()
  async getAllUsers() {
    console.log('Fetching all users');
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      console.error('Error fetching all users', error);
      throw new BadRequestException('Error fetching users');
    }
  }
}

module.exports = { UserController };
