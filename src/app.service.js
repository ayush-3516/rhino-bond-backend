/**
 * @fileoverview Main application service providing core application
 * functionality and health monitoring.
 * 
 * @module AppService
 * @requires @nestjs/common
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Core application service handling basic app functionality
 * and health monitoring.
 * 
 * @class AppService
 */
@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Retrieves the current health status of the application.
   * 
   * @returns {Object} Health status information including version and timestamp
   */
  getHealthStatus() {
    return {
      status: 'healthy',
      version: this.configService.get('APP_VERSION', '1.0.0'),
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };
  }

  /**
   * Retrieves basic information about the application.
   * 
   * @returns {Object} Application information including name, version, and environment
   */
  getAppInfo() {
    return {
      name: 'Rhino Bond Backend',
      description: 'Backend service for the Rhino Bond platform',
      version: this.configService.get('APP_VERSION', '1.0.0'),
      environment: this.configService.get('NODE_ENV', 'development'),
      apiDocs: '/api/docs',
      features: [
        'User Management',
        'Points System',
        'Rewards Program',
        'Challenge System',
        'Event Management',
        'QR Code Integration',
        'Support System',
        'Notifications'
      ]
    };
  }
}
