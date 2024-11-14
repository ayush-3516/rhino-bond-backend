const { IsString, IsNumber, IsNotEmpty, IsOptional, IsUUID, IsEnum } = require('class-validator');

const QRCodeType = {
  POINTS: 'POINTS',
  REWARD: 'REWARD',
  PRODUCT: 'PRODUCT',
  EVENT: 'EVENT',
};

const QRCodeStatus = {
  ACTIVE: 'ACTIVE',
  USED: 'USED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
};

class GenerateQRCodeDto {
  @IsEnum(QRCodeType)
  type;

  @IsNumber()
  value;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description;

  @IsOptional()
  @IsString()
  expiryDate;

  @IsOptional()
  @IsNumber()
  maxUses;
}

class ValidateQRCodeDto {
  @IsString()
  @IsNotEmpty()
  code;

  @IsOptional()
  @IsString()
  metadata;
}

class UpdateQRCodeDto {
  @IsOptional()
  @IsEnum(QRCodeStatus)
  status;

  @IsOptional()
  @IsString()
  expiryDate;

  @IsOptional()
  @IsNumber()
  maxUses;
}

class QRCodeStatsDto {
  @IsUUID()
  userId;

  @IsOptional()
  @IsEnum(QRCodeType)
  type;

  @IsOptional()
  @IsString()
  startDate;

  @IsOptional()
  @IsString()
  endDate;
}

module.exports = {
  QRCodeType,
  QRCodeStatus,
  GenerateQRCodeDto,
  ValidateQRCodeDto,
  UpdateQRCodeDto,
  QRCodeStatsDto,
};
