const { Controller, Get, Post, Put, Body, Param } = require('@nestjs/common');
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
  async getUser(id) {
    console.log(`Fetching user with ID: ${id}`);
    return this.prisma.user.findUnique({ where: { id } });
  }

  /**
   * Updates a user's information.
   * @param id - The ID of the user to update.
   * @param body - The updated user information.
   * @returns The updated user object.
   */
  async updateUser(id, body) {
    console.log(`Updating user with ID: ${id}`);
    const { email, password, phoneNumber, otp, name, address, points, kycStatus } = body;
    return this.prisma.user.update({
      where: { id },
      data: {
        email,
        password,
        phoneNumber,
        otp,
        name,
        address,
        points,
        kycStatus,
      },
    });
  }

  /**
   * Registers a new user.
   * @param body - The user information for registration.
   * @returns The newly created user object.
   */
  async registerUser(body) {
    console.log('Registering new user');
    const { email, password, phoneNumber, otp, name, address, points, kycStatus } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
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
  }
}

module.exports = { UserController };
