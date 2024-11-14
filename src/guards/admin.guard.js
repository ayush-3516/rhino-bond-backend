const { Injectable, CanActivate, ExecutionContext, UnauthorizedException } = require('@nestjs/common');
const { UserService } = require('../services/user.service');

@Injectable()
class AdminGuard {
  constructor(userService) {
    this.userService = userService;
  }

  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const userDetails = await this.userService.getUserById(user.id);
    
    if (!userDetails || userDetails.role !== 'ADMIN') {
      throw new UnauthorizedException('Admin access required');
    }

    return true;
  }
}

module.exports = { AdminGuard };
