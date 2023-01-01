import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/user/user.entity';
import { ROLES_KEY } from '../auth.decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        console.log(user)
        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}