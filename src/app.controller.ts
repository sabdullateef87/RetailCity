import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { Roles } from './auth/auth.decorators/role.decorator';
import { JwtAuthGuard } from './auth/auth.guards/jwt-auth.guards';
import { UserRole } from './user/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('app')
  @Roles(UserRole.ADMIN)
  getHello(): string {
    return this.appService.getHello();
  }
}
