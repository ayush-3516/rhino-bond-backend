import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { QRService } from '../services/qr.service';
import { ValidateQRCodeDto } from '../dtos/qr.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('qr')
@UseGuards(JwtAuthGuard)
export class QRController {
  constructor(private qrService: QRService) {}

  @Post('generate')
  async generateQRCode(@Request() req) {
    return this.qrService.generateQRCode(req.user.id);
  }

  @Post('validate')
  async validateQRCode(@Request() req, @Body() validateQRCodeDto: ValidateQRCodeDto) {
    return this.qrService.validateQRCode(validateQRCodeDto.code, req.user.id);
  }

  @Get('my-codes')
  async getUserQRCodes(@Request() req) {
    return this.qrService.getUserQRCodes(req.user.id);
  }

  @Delete(':id')
  async deleteQRCode(@Request() req, @Param('id') id) {
    return this.qrService.deleteQRCode(id, req.user.id);
  }
}

export const QRController;
