const { Injectable, ExecutionContext, UnauthorizedException } = require('@nestjs/common');
const { AuthGuard } = require('@nestjs/passport');
const { JwtService } = require('@nestjs/jwt');

@Injectable()
class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(jwtService) {
    super();
    this.jwtService = jwtService;
  }

  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  extractTokenFromHeader(request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

module.exports = { JwtAuthGuard };
