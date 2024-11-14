/**
 * @fileoverview Settings DTOs for managing platform-wide configurations
 * This file contains all the Data Transfer Objects (DTOs) related to platform settings
 * including general settings, points configuration, rewards settings, etc.
 * 
 * @module dtos/settings
 * @requires class-validator
 */

const { IsString, IsNumber, IsBoolean, IsArray, IsOptional, IsNotEmpty, Min, IsUUID, IsEnum, IsEmail, IsUrl } = require('class-validator');

/**
 * Enum representing different categories of platform settings
 * @enum {string}
 */
const SettingsCategory = {
  GENERAL: 'GENERAL',
  POINTS: 'POINTS',
  REWARDS: 'REWARDS',
  CHALLENGES: 'CHALLENGES',
  EVENTS: 'EVENTS',
  NOTIFICATIONS: 'NOTIFICATIONS',
  SECURITY: 'SECURITY',
};

/**
 * Enum representing different notification channels available in the platform
 * @enum {string}
 */
const NotificationChannel = {
  EMAIL: 'EMAIL',
  PUSH: 'PUSH',
  SMS: 'SMS',
  IN_APP: 'IN_APP',
};

/**
 * DTO for updating general platform settings
 * @class UpdateGeneralSettingsDto
 */
class UpdateGeneralSettingsDto {
  /** @property {string} platformName - The name of the platform */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  platformName;

  /** @property {string} description - General description of the platform */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description;

  /** @property {string} logoUrl - URL to the platform's logo */
  @IsOptional()
  @IsUrl()
  logoUrl;

  /** @property {string} supportEmail - Email address for platform support */
  @IsOptional()
  @IsEmail()
  supportEmail;

  /** @property {string} timezone - Default timezone for the platform */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  timezone;

  /** @property {string} defaultLanguage - Default language for the platform */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  defaultLanguage;
}

/**
 * DTO for updating points-related settings
 * @class UpdatePointsSettingsDto
 */
class UpdatePointsSettingsDto {
  /** @property {number} signupBonus - Points awarded for new user signup */
  @IsOptional()
  @IsNumber()
  @Min(0)
  signupBonus;

  /** @property {number} referralBonus - Points awarded for successful referrals */
  @IsOptional()
  @IsNumber()
  @Min(0)
  referralBonus;

  /** @property {number} dailyLoginBonus - Points awarded for daily login */
  @IsOptional()
  @IsNumber()
  @Min(0)
  dailyLoginBonus;

  /** @property {number} minimumTransfer - Minimum points allowed for transfer */
  @IsOptional()
  @IsNumber()
  @Min(0)
  minimumTransfer;

  /** @property {number} maximumTransfer - Maximum points allowed for transfer */
  @IsOptional()
  @IsNumber()
  @Min(0)
  maximumTransfer;

  /** @property {boolean} allowNegativeBalance - Whether to allow negative point balance */
  @IsOptional()
  @IsBoolean()
  allowNegativeBalance;

  /** @property {number} expiryDays - Number of days until points expire */
  @IsOptional()
  @IsNumber()
  @Min(0)
  expiryDays;
}

/**
 * DTO for updating rewards-related settings
 * @class UpdateRewardsSettingsDto
 */
class UpdateRewardsSettingsDto {
  /** @property {number} minimumPoints - Minimum points required for any reward */
  @IsOptional()
  @IsNumber()
  @Min(0)
  minimumPoints;

  /** @property {number} maximumPoints - Maximum points allowed for any reward */
  @IsOptional()
  @IsNumber()
  @Min(0)
  maximumPoints;

  /** @property {number} defaultExpiryDays - Default number of days until rewards expire */
  @IsOptional()
  @IsNumber()
  @Min(0)
  defaultExpiryDays;

  /** @property {boolean} allowPartialRedemption - Whether to allow partial reward redemption */
  @IsOptional()
  @IsBoolean()
  allowPartialRedemption;

  /** @property {string[]} categories - List of available reward categories */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories;
}

/**
 * DTO for updating challenge-related settings
 * @class UpdateChallengeSettingsDto
 */
class UpdateChallengeSettingsDto {
  /** @property {number} minimumDuration - Minimum duration for challenges in days */
  @IsOptional()
  @IsNumber()
  @Min(0)
  minimumDuration;

  /** @property {number} maximumDuration - Maximum duration for challenges in days */
  @IsOptional()
  @IsNumber()
  @Min(0)
  maximumDuration;

  /** @property {number} minimumParticipants - Minimum number of participants required */
  @IsOptional()
  @IsNumber()
  @Min(0)
  minimumParticipants;

  /** @property {number} maximumParticipants - Maximum number of participants allowed */
  @IsOptional()
  @IsNumber()
  @Min(0)
  maximumParticipants;

  /** @property {boolean} allowTeamChallenges - Whether to allow team challenges */
  @IsOptional()
  @IsBoolean()
  allowTeamChallenges;

  /** @property {number} maximumTeamSize - Maximum number of members in a team */
  @IsOptional()
  @IsNumber()
  @Min(1)
  maximumTeamSize;
}

/**
 * DTO for updating event-related settings
 * @class UpdateEventSettingsDto
 */
class UpdateEventSettingsDto {
  /** @property {number} minimumDuration - Minimum duration for events in hours */
  @IsOptional()
  @IsNumber()
  @Min(0)
  minimumDuration;

  /** @property {number} maximumDuration - Maximum duration for events in hours */
  @IsOptional()
  @IsNumber()
  @Min(0)
  maximumDuration;

  /** @property {number} minimumParticipants - Minimum number of participants required */
  @IsOptional()
  @IsNumber()
  @Min(0)
  minimumParticipants;

  /** @property {number} maximumParticipants - Maximum number of participants allowed */
  @IsOptional()
  @IsNumber()
  @Min(0)
  maximumParticipants;

  /** @property {boolean} requireRegistration - Whether to require event registration */
  @IsOptional()
  @IsBoolean()
  requireRegistration;

  /** @property {number} registrationBuffer - Hours before event when registration closes */
  @IsOptional()
  @IsNumber()
  @Min(0)
  registrationBuffer;
}

/**
 * DTO for updating notification-related settings
 * @class UpdateNotificationSettingsDto
 */
class UpdateNotificationSettingsDto {
  /** @property {NotificationChannel[]} enabledChannels - List of enabled notification channels */
  @IsOptional()
  @IsArray()
  @IsEnum(NotificationChannel, { each: true })
  enabledChannels;

  /** @property {boolean} allowMarketing - Whether to allow marketing notifications */
  @IsOptional()
  @IsBoolean()
  allowMarketing;

  /** @property {number} emailFrequency - Minimum hours between email notifications */
  @IsOptional()
  @IsNumber()
  @Min(0)
  emailFrequency;

  /** @property {number} pushFrequency - Minimum hours between push notifications */
  @IsOptional()
  @IsNumber()
  @Min(0)
  pushFrequency;

  /** @property {boolean} digestEnabled - Whether to enable notification digests */
  @IsOptional()
  @IsBoolean()
  digestEnabled;

  /** @property {string} digestFrequency - Frequency of notification digests */
  @IsOptional()
  @IsEnum(['DAILY', 'WEEKLY', 'MONTHLY'])
  digestFrequency;
}

/**
 * DTO for updating security-related settings
 * @class UpdateSecuritySettingsDto
 */
class UpdateSecuritySettingsDto {
  /** @property {number} sessionTimeout - Session timeout in minutes */
  @IsOptional()
  @IsNumber()
  @Min(0)
  sessionTimeout;

  /** @property {number} maxLoginAttempts - Maximum failed login attempts before lockout */
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxLoginAttempts;

  /** @property {number} lockoutDuration - Account lockout duration in minutes */
  @IsOptional()
  @IsNumber()
  @Min(0)
  lockoutDuration;

  /** @property {boolean} requireMFA - Whether to require multi-factor authentication */
  @IsOptional()
  @IsBoolean()
  requireMFA;

  /** @property {string[]} allowedIPs - List of allowed IP addresses */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allowedIPs;

  /** @property {boolean} enforcePasswordPolicy - Whether to enforce password policy */
  @IsOptional()
  @IsBoolean()
  enforcePasswordPolicy;

  /** @property {number} passwordExpiryDays - Days until password expiry */
  @IsOptional()
  @IsNumber()
  @Min(0)
  passwordExpiryDays;
}

module.exports = {
  SettingsCategory,
  NotificationChannel,
  UpdateGeneralSettingsDto,
  UpdatePointsSettingsDto,
  UpdateRewardsSettingsDto,
  UpdateChallengeSettingsDto,
  UpdateEventSettingsDto,
  UpdateNotificationSettingsDto,
  UpdateSecuritySettingsDto,
};
