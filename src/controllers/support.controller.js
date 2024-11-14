import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { SupportService } from '../services/support.service';
import { CreateTicketDto, UpdateTicketStatusDto, RespondToTicketDto } from '../dtos/support.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('support')
@UseGuards(JwtAuthGuard)
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post('tickets')
  async createTicket(@Request() req, @Body() createTicketDto: CreateTicketDto) {
    return this.supportService.createTicket(req.user.id, createTicketDto);
  }

  @Get('tickets')
  async getUserTickets(@Request() req) {
    return this.supportService.getUserTickets(req.user.id);
  }

  @Get('tickets/:id')
  async getTicket(@Request() req, @Param('id') id: string) {
    return this.supportService.getTicket(id, req.user.id);
  }

  @Put('tickets/:id/status')
  async updateTicketStatus(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTicketStatusDto: UpdateTicketStatusDto
  ) {
    return this.supportService.updateTicketStatus(id, req.user.id, updateTicketStatusDto.status);
  }

  @UseGuards(AdminGuard)
  @Get('admin/tickets')
  async getAllTickets() {
    return this.supportService.getAllTickets();
  }

  @Post('tickets/:id/respond')
  async respondToTicket(
    @Request() req,
    @Param('id') id: string,
    @Body() respondToTicketDto: RespondToTicketDto
  ) {
    const isStaff = respondToTicketDto.responseType === 'staff';
    if (isStaff) {
      // Only admins can respond as staff
      await this.adminGuard.canActivate(req);
    }
    return this.supportService.respondToTicket(id, respondToTicketDto.message, isStaff);
  }
}

export const SupportController = SupportController;
