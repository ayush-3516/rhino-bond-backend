const { IsString, IsEnum, IsOptional, IsNotEmpty, IsUUID, IsBoolean, IsArray } = require('class-validator');

const NotificationType = {
  GENERAL: 'GENERAL',
  POINTS: 'POINTS',
  REWARD: 'REWARD',
  SUPPORT: 'SUPPORT',
  SYSTEM: 'SYSTEM',
};

const NotificationPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
};

class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  title;

  @IsString()
  @IsNotEmpty()
  message;

  @IsEnum(NotificationType)
  type;

  @IsOptional()
  @IsEnum(NotificationPriority)
  priority;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  link;

  @IsOptional()
  @IsArray()
  @IsUUID({ each: true })
  recipients;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  icon;

  @IsOptional()
  @IsString()
  expiryDate;
}

class UpdateNotificationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  message;

  @IsOptional()
  @IsEnum(NotificationType)
  type;

  @IsOptional()
  @IsEnum(NotificationPriority)
  priority;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  link;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  icon;

  @IsOptional()
  @IsString()
  expiryDate;
}

class BroadcastNotificationDto extends CreateNotificationDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  userGroups;

  @IsOptional()
  @IsBoolean()
  sendEmail;

  @IsOptional()
  @IsBoolean()
  sendPush;
}

class NotificationPreferencesDto {
  @IsBoolean()
  emailEnabled;

  @IsBoolean()
  pushEnabled;

  @IsOptional()
  @IsArray()
  @IsEnum(NotificationType, { each: true })
  disabledTypes;
}

module.exports = {
  NotificationType,
  NotificationPriority,
  CreateNotificationDto,
  UpdateNotificationDto,
  BroadcastNotificationDto,
  NotificationPreferencesDto,
};
