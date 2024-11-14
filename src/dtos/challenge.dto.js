/**
 * @fileoverview Challenge DTOs for managing platform challenges
 * This file contains all the Data Transfer Objects (DTOs) related to challenges,
 * including challenge creation, updates, participation, and progress tracking.
 * 
 * @module dtos/challenge
 * @requires class-validator
 */

const { IsString, IsNumber, IsBoolean, IsArray, IsOptional, IsNotEmpty, Min, IsUUID, IsEnum, IsDateString } = require('class-validator');

/**
 * Enum representing different types of challenges
 * @enum {string}
 */
const ChallengeType = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  SPECIAL: 'SPECIAL',
  COMMUNITY: 'COMMUNITY',
};

/**
 * Enum representing different challenge statuses
 * @enum {string}
 */
const ChallengeStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

/**
 * Enum representing different challenge categories
 * @enum {string}
 */
const ChallengeCategory = {
  POINTS: 'POINTS',
  REWARDS: 'REWARDS',
  SOCIAL: 'SOCIAL',
  ENVIRONMENTAL: 'ENVIRONMENTAL',
  EDUCATIONAL: 'EDUCATIONAL',
};

/**
 * DTO for creating a new challenge
 * @class CreateChallengeDto
 */
class CreateChallengeDto {
  /** @property {string} title - Title of the challenge */
  @IsString()
  @IsNotEmpty()
  title;

  /** @property {string} description - Detailed description of the challenge */
  @IsString()
  @IsNotEmpty()
  description;

  /** @property {ChallengeType} type - Type of the challenge */
  @IsEnum(ChallengeType)
  type;

  /** @property {ChallengeCategory} category - Category of the challenge */
  @IsEnum(ChallengeCategory)
  category;

  /** @property {Date} startDate - Start date of the challenge */
  @IsDateString()
  startDate;

  /** @property {Date} endDate - End date of the challenge */
  @IsDateString()
  endDate;

  /** @property {number} pointsReward - Points awarded for completion */
  @IsNumber()
  @Min(0)
  pointsReward;

  /** @property {string[]} requirements - List of challenge requirements */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements;

  /** @property {number} maxParticipants - Maximum number of participants */
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxParticipants;

  /** @property {string[]} tags - Tags for categorizing the challenge */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags;

  /** @property {boolean} isTeamChallenge - Whether it's a team challenge */
  @IsOptional()
  @IsBoolean()
  isTeamChallenge;

  /** @property {number} teamSize - Required team size if team challenge */
  @IsOptional()
  @IsNumber()
  @Min(1)
  teamSize;
}

/**
 * DTO for updating an existing challenge
 * @class UpdateChallengeDto
 */
class UpdateChallengeDto {
  /** @property {string} title - Updated title */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title;

  /** @property {string} description - Updated description */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description;

  /** @property {ChallengeType} type - Updated type */
  @IsOptional()
  @IsEnum(ChallengeType)
  type;

  /** @property {ChallengeCategory} category - Updated category */
  @IsOptional()
  @IsEnum(ChallengeCategory)
  category;

  /** @property {Date} startDate - Updated start date */
  @IsOptional()
  @IsDateString()
  startDate;

  /** @property {Date} endDate - Updated end date */
  @IsOptional()
  @IsDateString()
  endDate;

  /** @property {number} pointsReward - Updated points reward */
  @IsOptional()
  @IsNumber()
  @Min(0)
  pointsReward;

  /** @property {string[]} requirements - Updated requirements */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements;

  /** @property {number} maxParticipants - Updated max participants */
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxParticipants;

  /** @property {string[]} tags - Updated tags */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags;

  /** @property {ChallengeStatus} status - Updated status */
  @IsOptional()
  @IsEnum(ChallengeStatus)
  status;
}

/**
 * DTO for joining a challenge
 * @class JoinChallengeDto
 */
class JoinChallengeDto {
  /** @property {string} challengeId - UUID of the challenge */
  @IsUUID()
  challengeId;

  /** @property {string[]} teamMembers - UUIDs of team members if team challenge */
  @IsOptional()
  @IsArray()
  @IsUUID({ each: true })
  teamMembers;

  /** @property {string} teamName - Team name if team challenge */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  teamName;
}

/**
 * DTO for searching challenges
 * @class SearchChallengesDto
 */
class SearchChallengesDto {
  /** @property {string} query - Search query string */
  @IsOptional()
  @IsString()
  query;

  /** @property {ChallengeType} type - Challenge type filter */
  @IsOptional()
  @IsEnum(ChallengeType)
  type;

  /** @property {ChallengeCategory} category - Challenge category filter */
  @IsOptional()
  @IsEnum(ChallengeCategory)
  category;

  /** @property {ChallengeStatus} status - Challenge status filter */
  @IsOptional()
  @IsEnum(ChallengeStatus)
  status;

  /** @property {Date} startDate - Start date range filter */
  @IsOptional()
  @IsDateString()
  startDate;

  /** @property {Date} endDate - End date range filter */
  @IsOptional()
  @IsDateString()
  endDate;

  /** @property {string[]} tags - Tags to filter by */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags;

  /** @property {boolean} onlyAvailable - Filter only available challenges */
  @IsOptional()
  @IsBoolean()
  onlyAvailable;

  /** @property {boolean} onlyTeamChallenges - Filter only team challenges */
  @IsOptional()
  @IsBoolean()
  onlyTeamChallenges;
}

/**
 * DTO for submitting challenge progress
 * @class SubmitChallengeProgressDto
 */
class SubmitChallengeProgressDto {
  /** @property {string} challengeId - UUID of the challenge */
  @IsUUID()
  challengeId;

  /** @property {string} progressDescription - Description of progress made */
  @IsString()
  @IsNotEmpty()
  progressDescription;

  /** @property {string[]} attachments - URLs of supporting attachments */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments;

  /** @property {number} completionPercentage - Percentage of completion */
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  completionPercentage;
}

/**
 * DTO for validating challenge progress
 * @class ValidateChallengeProgressDto
 */
class ValidateChallengeProgressDto {
  /** @property {string} challengeId - UUID of the challenge */
  @IsUUID()
  challengeId;

  /** @property {string} userId - UUID of the user */
  @IsUUID()
  userId;

  /** @property {boolean} isApproved - Whether the progress is approved */
  @IsBoolean()
  isApproved;

  /** @property {string} feedback - Feedback on the progress */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  feedback;
}

module.exports = {
  ChallengeType,
  ChallengeStatus,
  ChallengeCategory,
  CreateChallengeDto,
  UpdateChallengeDto,
  JoinChallengeDto,
  SearchChallengesDto,
  SubmitChallengeProgressDto,
  ValidateChallengeProgressDto,
};
