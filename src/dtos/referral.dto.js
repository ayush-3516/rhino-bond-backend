const { IsString, IsNumber, IsBoolean, IsArray, IsOptional, IsNotEmpty, Min, IsUUID, IsEnum, IsEmail, IsDateString } = require('class-validator');

const ReferralStatus = {
  PENDING: 'PENDING',
  REGISTERED: 'REGISTERED',
  QUALIFIED: 'QUALIFIED',
  REWARDED: 'REWARDED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
};

const ReferralType = {
  STANDARD: 'STANDARD',
  PREMIUM: 'PREMIUM',
  EVENT: 'EVENT',
  CHALLENGE: 'CHALLENGE',
  CUSTOM: 'CUSTOM',
};

class CreateReferralDto {
  @IsEmail()
  referredEmail;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  referredName;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  personalMessage;

  @IsOptional()
  @IsEnum(ReferralType)
  type;

  @IsOptional()
  @IsUUID()
  relatedEntityId;

  @IsOptional()
  @IsDateString()
  expiryDate;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  metadata;
}

class UpdateReferralDto {
  @IsOptional()
  @IsEnum(ReferralStatus)
  status;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  notes;

  @IsOptional()
  @IsDateString()
  expiryDate;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  metadata;
}

class GetUserReferralsDto {
  @IsUUID()
  userId;

  @IsOptional()
  @IsArray()
  @IsEnum(ReferralStatus, { each: true })
  statuses;

  @IsOptional()
  @IsEnum(ReferralType)
  type;

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

class SearchReferralsDto {
  @IsOptional()
  @IsArray()
  @IsEnum(ReferralStatus, { each: true })
  statuses;

  @IsOptional()
  @IsEnum(ReferralType)
  type;

  @IsOptional()
  @IsArray()
  @IsUUID({ each: true })
  referrerIds;

  @IsOptional()
  @IsDateString()
  startDate;

  @IsOptional()
  @IsDateString()
  endDate;

  @IsOptional()
  @IsBoolean()
  onlyQualified;

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

class BulkCreateReferralsDto {
  @IsArray()
  @IsEmail({ each: true })
  referredEmails;

  @IsOptional()
  @IsEnum(ReferralType)
  type;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  personalMessage;

  @IsOptional()
  @IsDateString()
  expiryDate;

  @IsOptional()
  @IsBoolean()
  skipDuplicates;
}

class ReferralRewardDto {
  @IsUUID()
  referralId;

  @IsNumber()
  @Min(0)
  points;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  notes;

  @IsOptional()
  @IsBoolean()
  notifyReferrer;

  @IsOptional()
  @IsBoolean()
  notifyReferred;
}

class ReferralStatsDto {
  @IsOptional()
  @IsArray()
  @IsUUID({ each: true })
  userIds;

  @IsOptional()
  @IsEnum(ReferralType)
  type;

  @IsOptional()
  @IsDateString()
  startDate;

  @IsOptional()
  @IsDateString()
  endDate;

  @IsOptional()
  @IsBoolean()
  includeDetails;
}

module.exports = {
  ReferralStatus,
  ReferralType,
  CreateReferralDto,
  UpdateReferralDto,
  GetUserReferralsDto,
  SearchReferralsDto,
  BulkCreateReferralsDto,
  ReferralRewardDto,
  ReferralStatsDto,
};
