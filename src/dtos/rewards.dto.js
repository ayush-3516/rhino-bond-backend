const { IsString, IsNumber, IsBoolean, IsArray, IsOptional, IsNotEmpty, Min, IsUUID, IsEnum } = require('class-validator');

const RewardType = {
  PRODUCT: 'PRODUCT',
  SERVICE: 'SERVICE',
  VOUCHER: 'VOUCHER',
  EVENT: 'EVENT',
};

const RewardStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  EXPIRED: 'EXPIRED',
  CLAIMED: 'CLAIMED',
};

class CreateRewardDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsString()
  @IsNotEmpty()
  description;

  @IsNumber()
  @Min(0)
  pointsRequired;

  @IsEnum(RewardType)
  type;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images;

  @IsNumber()
  @Min(0)
  stock;

  @IsOptional()
  @IsString()
  expiryDate;

  @IsOptional()
  @IsBoolean()
  featured;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags;
}

class UpdateRewardDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pointsRequired;

  @IsOptional()
  @IsEnum(RewardType)
  type;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock;

  @IsOptional()
  @IsString()
  expiryDate;

  @IsOptional()
  @IsBoolean()
  featured;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags;
}

class ClaimRewardDto {
  @IsUUID()
  rewardId;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  deliveryAddress;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  note;
}

class SearchRewardsDto {
  @IsOptional()
  @IsString()
  query;

  @IsOptional()
  @IsEnum(RewardType)
  type;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPoints;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPoints;

  @IsOptional()
  @IsBoolean()
  available;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags;
}

module.exports = {
  RewardType,
  RewardStatus,
  CreateRewardDto,
  UpdateRewardDto,
  ClaimRewardDto,
  SearchRewardsDto,
};
