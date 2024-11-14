const { IsString, IsEnum, IsOptional, IsNotEmpty, IsUUID, IsBoolean, IsArray } = require('class-validator');

const TicketStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
};

const TicketPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
};

const TicketCategory = {
  GENERAL: 'GENERAL',
  TECHNICAL: 'TECHNICAL',
  BILLING: 'BILLING',
  ACCOUNT: 'ACCOUNT',
  OTHER: 'OTHER',
};

class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  subject;

  @IsString()
  @IsNotEmpty()
  message;

  @IsEnum(Object.values(TicketCategory))
  category;

  @IsOptional()
  @IsEnum(Object.values(TicketPriority))
  priority;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments;
}

class UpdateTicketStatusDto {
  @IsEnum(Object.values(TicketStatus))
  status;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  note;
}

class RespondToTicketDto {
  @IsString()
  @IsNotEmpty()
  message;

  @IsBoolean()
  isStaffResponse;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments;
}

class SearchTicketsDto {
  @IsOptional()
  @IsString()
  query;

  @IsOptional()
  @IsEnum(Object.values(TicketStatus))
  status;

  @IsOptional()
  @IsEnum(Object.values(TicketCategory))
  category;

  @IsOptional()
  @IsEnum(Object.values(TicketPriority))
  priority;

  @IsOptional()
  @IsString()
  startDate;

  @IsOptional()
  @IsString()
  endDate;
}

class AssignTicketDto {
  @IsUUID()
  staffId;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  note;
}

module.exports = {
  TicketStatus,
  TicketPriority,
  TicketCategory,
  CreateTicketDto,
  UpdateTicketStatusDto,
  RespondToTicketDto,
  SearchTicketsDto,
  AssignTicketDto,
};
