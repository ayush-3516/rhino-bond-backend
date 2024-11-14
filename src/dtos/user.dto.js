const { IsString, IsEmail, IsPhoneNumber, IsEnum, IsOptional, IsNotEmpty } = require('class-validator');

const KYCStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

const UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
};

class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name;

  @IsOptional()
  @IsEmail()
  email;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  avatar;
}

class UpdateKYCStatusDto {
  @IsEnum(KYCStatus)
  status;

  @IsOptional()
  @IsString()
  rejectionReason;
}

class UpdateUserRoleDto {
  @IsEnum(UserRole)
  role;
}

class UserStatsDto {
  @IsString()
  @IsNotEmpty()
  userId;
}

class KYCSubmissionDto {
  @IsString()
  @IsNotEmpty()
  idType;

  @IsString()
  @IsNotEmpty()
  idNumber;

  @IsString()
  @IsNotEmpty()
  idFrontImage;

  @IsString()
  @IsNotEmpty()
  idBackImage;

  @IsOptional()
  @IsString()
  selfieImage;
}

module.exports = {
  KYCStatus,
  UserRole,
  UpdateProfileDto,
  UpdateKYCStatusDto,
  UpdateUserRoleDto,
  UserStatsDto,
  KYCSubmissionDto,
};
