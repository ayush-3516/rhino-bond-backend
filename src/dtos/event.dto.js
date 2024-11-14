/**
 * @fileoverview Event DTOs for managing platform events
 * This file contains all the Data Transfer Objects (DTOs) related to events,
 * including event creation, updates, registration, and search functionality.
 * 
 * @module dtos/event
 * @requires class-validator
 */

const { IsString, IsNumber, IsBoolean, IsArray, IsOptional, IsNotEmpty, Min, IsUUID, IsEnum, IsDateString } = require('class-validator');

/**
 * Enum representing different types of events
 * @enum {string}
 */
const EventType = {
  GENERAL: 'GENERAL',
  POINTS: 'POINTS',
  REWARD: 'REWARD',
  PROMOTION: 'PROMOTION',
  CHALLENGE: 'CHALLENGE',
};

/**
 * Enum representing different event statuses
 * @enum {string}
 */
const EventStatus = {
  UPCOMING: 'UPCOMING',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

/**
 * DTO for creating a new event
 * @class CreateEventDto
 */
class CreateEventDto {
  /** @property {string} title - Title of the event */
  @IsString()
  @IsNotEmpty()
  title;

  /** @property {string} description - Detailed description of the event */
  @IsString()
  @IsNotEmpty()
  description;

  /** @property {EventType} type - Type of the event */
  @IsEnum(EventType)
  type;

  /** @property {Date} startDate - Start date and time of the event */
  @IsDateString()
  startDate;

  /** @property {Date} endDate - End date and time of the event */
  @IsDateString()
  endDate;

  /** @property {string} location - Physical or virtual location of the event */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  location;

  /** @property {number} maxParticipants - Maximum number of participants allowed */
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxParticipants;

  /** @property {string[]} images - Array of image URLs for the event */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images;

  /** @property {number} pointsReward - Points awarded for participation */
  @IsOptional()
  @IsNumber()
  @Min(0)
  pointsReward;

  /** @property {string[]} tags - Array of tags for categorizing the event */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags;

  /** @property {boolean} requiresRegistration - Whether registration is required */
  @IsOptional()
  @IsBoolean()
  requiresRegistration;
}

/**
 * DTO for updating an existing event
 * @class UpdateEventDto
 */
class UpdateEventDto {
  /** @property {string} title - Updated title of the event */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title;

  /** @property {string} description - Updated description of the event */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description;

  /** @property {EventType} type - Updated type of the event */
  @IsOptional()
  @IsEnum(EventType)
  type;

  /** @property {Date} startDate - Updated start date and time */
  @IsOptional()
  @IsDateString()
  startDate;

  /** @property {Date} endDate - Updated end date and time */
  @IsOptional()
  @IsDateString()
  endDate;

  /** @property {string} location - Updated location */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  location;

  /** @property {number} maxParticipants - Updated maximum participants */
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxParticipants;

  /** @property {string[]} images - Updated image URLs */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images;

  /** @property {number} pointsReward - Updated points reward */
  @IsOptional()
  @IsNumber()
  @Min(0)
  pointsReward;

  /** @property {string[]} tags - Updated tags */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags;

  /** @property {boolean} requiresRegistration - Updated registration requirement */
  @IsOptional()
  @IsBoolean()
  requiresRegistration;

  /** @property {EventStatus} status - Updated event status */
  @IsOptional()
  @IsEnum(EventStatus)
  status;
}

/**
 * DTO for registering for an event
 * @class RegisterForEventDto
 */
class RegisterForEventDto {
  /** @property {string} eventId - UUID of the event */
  @IsUUID()
  eventId;

  /** @property {string} notes - Optional registration notes */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  notes;
}

/**
 * DTO for searching events
 * @class SearchEventsDto
 */
class SearchEventsDto {
  /** @property {string} query - Search query string */
  @IsOptional()
  @IsString()
  query;

  /** @property {EventType} type - Event type filter */
  @IsOptional()
  @IsEnum(EventType)
  type;

  /** @property {EventStatus} status - Event status filter */
  @IsOptional()
  @IsEnum(EventStatus)
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

  /** @property {boolean} onlyAvailable - Filter only available events */
  @IsOptional()
  @IsBoolean()
  onlyAvailable;
}

/**
 * DTO for event participation feedback
 * @class EventParticipationDto
 */
class EventParticipationDto {
  /** @property {string} eventId - UUID of the event */
  @IsUUID()
  eventId;

  /** @property {string} userId - UUID of the participant */
  @IsUUID()
  userId;

  /** @property {string} feedback - Participant's feedback */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  feedback;

  /** @property {number} rating - Event rating (1-5) */
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating;
}

module.exports = {
  EventType,
  EventStatus,
  CreateEventDto,
  UpdateEventDto,
  RegisterForEventDto,
  SearchEventsDto,
  EventParticipationDto,
};
