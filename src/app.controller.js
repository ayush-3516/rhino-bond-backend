/**
 * @fileoverview Main application controller providing basic health check
 * and application information endpoints.
 * 
 * @module AppController
 * @requires @nestjs/common
 * @requires @nestjs/swagger
 */

import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

/**
 * Root controller providing application-level endpoints.
 * 
 * @class AppController
 */
@ApiTags('Application')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Health check endpoint to verify the application is running.
   * 
   * @returns {Object} Application status and version information
   */
  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ 
    status: 200, 
    description: 'Application is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'healthy' },
        version: { type: 'string', example: '1.0.0' },
        timestamp: { type: 'string', example: '2023-12-20T12:00:00Z' }
      }
    }
  })
  healthCheck() {
    return this.appService.getHealthStatus();
  }

  /**
   * Root endpoint providing basic application information.
   * 
   * @returns {Object} Basic application information
   */
  @Get()
  @ApiOperation({ summary: 'Get application information' })
  @ApiResponse({
    status: 200,
    description: 'Application information retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Rhino Bond Backend' },
        description: { type: 'string' },
        version: { type: 'string' },
        environment: { type: 'string' }
      }
    }
  })
  getAppInfo() {
    return this.appService.getAppInfo();
  }
}
