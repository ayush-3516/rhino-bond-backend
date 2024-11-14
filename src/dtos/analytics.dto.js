const { IsString, IsNumber, IsBoolean, IsArray, IsOptional, IsNotEmpty, Min, IsUUID, IsEnum, IsDateString } = require('class-validator');

const AnalyticsTimeframe = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  YEARLY: 'YEARLY',
  CUSTOM: 'CUSTOM',
};

const MetricType = {
  USER_ENGAGEMENT: 'USER_ENGAGEMENT',
  POINTS_ACTIVITY: 'POINTS_ACTIVITY',
  REWARD_REDEMPTION: 'REWARD_REDEMPTION',
  CHALLENGE_PARTICIPATION: 'CHALLENGE_PARTICIPATION',
  EVENT_ATTENDANCE: 'EVENT_ATTENDANCE',
  SUPPORT_TICKETS: 'SUPPORT_TICKETS',
  QR_CODE_SCANS: 'QR_CODE_SCANS',
};

class GetAnalyticsDto {
  @IsEnum(AnalyticsTimeframe)
  timeframe;

  @IsOptional()
  @IsDateString()
  startDate;

  @IsOptional()
  @IsDateString()
  endDate;

  @IsArray()
  @IsEnum(MetricType, { each: true })
  metrics;

  @IsOptional()
  @IsBoolean()
  includeComparison;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  segments;
}

class UserEngagementMetricsDto {
  @IsEnum(AnalyticsTimeframe)
  timeframe;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  userGroups;

  @IsOptional()
  @IsBoolean()
  includeInactive;

  @IsOptional()
  @IsNumber()
  @Min(1)
  inactivityThreshold;
}

class PointsAnalyticsDto {
  @IsEnum(AnalyticsTimeframe)
  timeframe;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories;

  @IsOptional()
  @IsBoolean()
  includeTransfers;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minAmount;
}

class RewardAnalyticsDto {
  @IsEnum(AnalyticsTimeframe)
  timeframe;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  rewardTypes;

  @IsOptional()
  @IsBoolean()
  includeExpired;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minRedemptions;
}

class ExportAnalyticsDto {
  @IsEnum(AnalyticsTimeframe)
  timeframe;

  @IsArray()
  @IsEnum(MetricType, { each: true })
  metrics;

  @IsString()
  @IsEnum(['CSV', 'JSON', 'PDF'])
  format;

  @IsOptional()
  @IsBoolean()
  includeRawData;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  segments;
}

class CustomAnalyticsQueryDto {
  @IsString()
  @IsNotEmpty()
  query;

  @IsOptional()
  @IsArray()
  parameters;

  @IsOptional()
  @IsBoolean()
  cache;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cacheDuration;
}

module.exports = {
  AnalyticsTimeframe,
  MetricType,
  GetAnalyticsDto,
  UserEngagementMetricsDto,
  PointsAnalyticsDto,
  RewardAnalyticsDto,
  ExportAnalyticsDto,
  CustomAnalyticsQueryDto,
};
