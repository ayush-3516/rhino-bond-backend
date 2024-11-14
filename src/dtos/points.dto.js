/**
 * @fileoverview Data Transfer Objects (DTOs) for points-related operations
 * including adding, deducting, and transferring points.
 * 
 * @module PointsDto
 * @requires class-validator
 */

const { IsNumber, IsString, IsNotEmpty, Min, IsOptional, IsUUID, IsEnum } = require('class-validator');
const { ApiProperty } = require('@nestjs/swagger');

/**
 * DTO for adding points to a user's balance
 */
class AddPointsDto {
  @ApiProperty({
    description: 'ID of the user receiving points',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  userId;

  @ApiProperty({
    description: 'Number of points to add (must be positive)',
    minimum: 0,
    example: 100
  })
  @IsNumber()
  @Min(0)
  points;

  @ApiProperty({
    description: 'Reason for adding points',
    example: 'Completed daily challenge'
  })
  @IsString()
  @IsNotEmpty()
  reason;

  @ApiProperty({
    description: 'Optional metadata for the points transaction',
    required: false,
    example: { challengeId: '123', difficulty: 'hard' }
  })
  @IsOptional()
  @IsString()
  metadata;
}

/**
 * DTO for deducting points from a user's balance
 */
class DeductPointsDto {
  @ApiProperty({
    description: 'ID of the user to deduct points from',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  userId;

  @ApiProperty({
    description: 'Number of points to deduct (must be positive)',
    minimum: 0,
    example: 50
  })
  @IsNumber()
  @Min(0)
  points;

  @ApiProperty({
    description: 'Reason for deducting points',
    example: 'Redeemed reward'
  })
  @IsString()
  @IsNotEmpty()
  reason;

  @ApiProperty({
    description: 'Optional metadata for the points transaction',
    required: false,
    example: { rewardId: '123', rewardType: 'badge' }
  })
  @IsOptional()
  @IsString()
  metadata;
}

/**
 * DTO for transferring points between users
 */
class TransferPointsDto {
  @ApiProperty({
    description: 'ID of the user receiving the points transfer',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  toUserId;

  @ApiProperty({
    description: 'Number of points to transfer (must be positive)',
    minimum: 0,
    example: 75
  })
  @IsNumber()
  @Min(0)
  points;

  @ApiProperty({
    description: 'Optional note for the points transfer',
    required: false,
    example: 'Thanks for your help!'
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  note;
}

/**
 * DTO for retrieving points history with filters
 */
class GetPointsHistoryDto {
  @ApiProperty({
    description: 'Optional start date for filtering history',
    required: false,
    example: '2023-01-01'
  })
  @IsOptional()
  @IsString()
  startDate;

  @ApiProperty({
    description: 'Optional end date for filtering history',
    required: false,
    example: '2023-12-31'
  })
  @IsOptional()
  @IsString()
  endDate;

  @ApiProperty({
    description: 'Optional transaction type filter',
    required: false,
    enum: ['EARNED', 'SPENT', 'TRANSFERRED'],
    example: 'EARNED'
  })
  @IsOptional()
  @IsEnum(['EARNED', 'SPENT', 'TRANSFERRED'])
  type;

  @ApiProperty({
    description: 'Maximum number of records to return',
    required: false,
    minimum: 1,
    maximum: 100,
    default: 50,
    example: 25
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit;
}

/**
 * DTO for retrieving points leaderboard with filters
 */
class GetLeaderboardDto {
  @ApiProperty({
    description: 'Maximum number of users to return',
    required: false,
    minimum: 1,
    maximum: 100,
    default: 10,
    example: 25
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit;

  @ApiProperty({
    description: 'Timeframe for leaderboard calculation',
    required: false,
    enum: ['daily', 'weekly', 'monthly', 'allTime'],
    default: 'allTime',
    example: 'monthly'
  })
  @IsOptional()
  @IsEnum(['daily', 'weekly', 'monthly', 'allTime'])
  timeframe;
}

module.exports = {
  AddPointsDto,
  DeductPointsDto,
  TransferPointsDto,
  GetPointsHistoryDto,
  GetLeaderboardDto
};
