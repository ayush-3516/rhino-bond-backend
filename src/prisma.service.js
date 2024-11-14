/**
 * @fileoverview Prisma service for database operations.
 * This service provides database connectivity and lifecycle management
 * using Prisma ORM with MongoDB.
 * 
 * @module PrismaService
 * @requires @nestjs/common
 * @requires @prisma/client
 */

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Service responsible for managing database connections and operations.
 * Extends PrismaClient to provide database access throughout the application.
 * Implements lifecycle hooks for proper connection management.
 * 
 * @class PrismaService
 * @extends {PrismaClient}
 * @implements {OnModuleInit}
 * @implements {OnModuleDestroy}
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
      errorFormat: 'pretty',
    });
  }

  /**
   * Lifecycle hook that runs when the module is initialized.
   * Establishes the database connection.
   * 
   * @async
   * @returns {Promise<void>}
   */
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Database connection established');
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  }

  /**
   * Lifecycle hook that runs when the module is destroyed.
   * Closes the database connection.
   * 
   * @async
   * @returns {Promise<void>}
   */
  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error disconnecting from database:', error);
      throw error;
    }
  }

  /**
   * Cleans up database connections before application shutdown.
   * 
   * @async
   * @returns {Promise<void>}
   */
  async enableShutdownHooks() {
    process.on('beforeExit', async () => {
      await this.$disconnect();
    });
  }
}
