const { IsString, IsNumber, IsBoolean, IsArray, IsOptional, IsNotEmpty, Min, IsUUID, IsEnum, IsDateString } = require('class-validator');

const ActivityType = {
  POINTS_EARNED: 'POINTS_EARNED',
  POINTS_SPENT: 'POINTS_SPENT',
  POINTS_TRANSFERRED: 'POINTS_TRANSFERRED',
  REWARD_CLAIMED: 'REWARD_CLAIMED',
  CHALLENGE_JOINED: 'CHALLENGE_JOINED',
  CHALLENGE_COMPLETED: 'CHALLENGE_COMPLETED',
  EVENT_REGISTERED: 'EVENT_REGISTERED',
  EVENT_ATTENDED: 'EVENT_ATTENDED',
  REFERRAL_MADE: 'REFERRAL_MADE',
  PROFILE_UPDATED: 'PROFILE_UPDATED',
  QR_CODE_SCANNED: 'QR_CODE_SCANNED',
  SUPPORT_TICKET_CREATED: 'SUPPORT_TICKET_CREATED',
};

const ActivityStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
};

class CreateActivityDto {
  @IsEnum(ActivityType)
  type;

  @IsUUID()
  userId;

  @IsString()
  @IsNotEmpty()
  description;

  @IsOptional()
  @IsNumber()
  @Min(0)
  points;

  @IsOptional()
  @IsUUID()
  relatedEntityId;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  metadata;

  @IsOptional()
  @IsEnum(ActivityStatus)
  status;
}

class UpdateActivityDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description;

  @IsOptional()
  @IsNumber()
  @Min(0)
  points;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  metadata;

  @IsOptional()
  @IsEnum(ActivityStatus)
  status;
}

class GetUserActivitiesDto {
  @IsUUID()
  userId;

  @IsOptional()
  @IsArray()
  @IsEnum(ActivityType, { each: true })
  types;

  @IsOptional()
  @IsDateString()
  startDate;

  @IsOptional()
  @IsDateString()
  endDate;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset;

  @IsOptional()
  @IsBoolean()
  includeMetadata;
}

class SearchActivitiesDto {
  @IsOptional()
  @IsArray()
  @IsEnum(ActivityType, { each: true })
  types;

  @IsOptional()
  @IsArray()
  @IsUUID({ each: true })
  userIds;

  @IsOptional()
  @IsDateString()
  startDate;

  @IsOptional()
  @IsDateString()
  endDate;

  @IsOptional()
  @IsArray()
  @IsEnum(ActivityStatus, { each: true })
  statuses;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPoints;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset;

  @IsOptional()
  @IsBoolean()
  includeMetadata;
}

class ExportActivitiesDto {
  @IsOptional()
  @IsArray()
  @IsEnum(ActivityType, { each: true })
  types;

  @IsOptional()
  @IsArray()
  @IsUUID({ each: true })
  userIds;

  @IsOptional()
  @IsDateString()
  startDate;

  @IsOptional()
  @IsDateString()
  endDate;

  @IsString()
  @IsEnum(['CSV', 'JSON', 'PDF'])
  format;

  @IsOptional()
  @IsBoolean()
  includeMetadata;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fields;
}

class BulkCreateActivitiesDto {
  @IsArray()
  activities;

  @IsOptional()
  @IsBoolean()
  skipValidation;

  @IsOptional()
  @IsBoolean()
  continueOnError;
}

module.exports = {
  ActivityType,
  ActivityStatus,
  CreateActivityDto,
  UpdateActivityDto,
  GetUserActivitiesDto,
  SearchActivitiesDto,
  ExportActivitiesDto,
  BulkCreateActivitiesDto,
};
