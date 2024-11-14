const { IsString, IsNumber, IsBoolean, IsArray, IsOptional, IsNotEmpty, Min, IsUUID, IsEnum, IsDateString } = require('class-validator');

const LeaderboardType = {
  POINTS: 'POINTS',
  CHALLENGES: 'CHALLENGES',
  EVENTS: 'EVENTS',
  REWARDS: 'REWARDS',
  REFERRALS: 'REFERRALS',
  CUSTOM: 'CUSTOM',
};

const LeaderboardTimeframe = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY',
  ALL_TIME: 'ALL_TIME',
  CUSTOM: 'CUSTOM',
};

class GetLeaderboardDto {
  @IsEnum(LeaderboardType)
  type;

  @IsEnum(LeaderboardTimeframe)
  timeframe;

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
  @IsArray()
  @IsString({ each: true })
  categories;

  @IsOptional()
  @IsBoolean()
  includeInactive;
}

class CreateCustomLeaderboardDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsString()
  @IsNotEmpty()
  description;

  @IsEnum(LeaderboardTimeframe)
  timeframe;

  @IsArray()
  @IsString({ each: true })
  metrics;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightPoints;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightChallenges;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightEvents;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightRewards;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightReferrals;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories;

  @IsOptional()
  @IsBoolean()
  isPublic;
}

class UpdateCustomLeaderboardDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description;

  @IsOptional()
  @IsEnum(LeaderboardTimeframe)
  timeframe;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  metrics;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightPoints;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightChallenges;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightEvents;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightRewards;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightReferrals;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories;

  @IsOptional()
  @IsBoolean()
  isPublic;
}

class LeaderboardFilterDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  userGroups;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  regions;

  @IsOptional()
  @IsBoolean()
  excludeStaff;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPoints;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minActivities;

  @IsOptional()
  @IsDateString()
  joinedBefore;

  @IsOptional()
  @IsDateString()
  joinedAfter;
}

class ExportLeaderboardDto {
  @IsEnum(LeaderboardType)
  type;

  @IsEnum(LeaderboardTimeframe)
  timeframe;

  @IsString()
  @IsEnum(['CSV', 'JSON', 'PDF'])
  format;

  @IsOptional()
  @IsBoolean()
  includeDetails;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fields;
}

module.exports = {
  LeaderboardType,
  LeaderboardTimeframe,
  GetLeaderboardDto,
  CreateCustomLeaderboardDto,
  UpdateCustomLeaderboardDto,
  LeaderboardFilterDto,
  ExportLeaderboardDto,
};
