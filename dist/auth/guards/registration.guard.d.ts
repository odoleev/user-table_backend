import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
export declare class RegistrationGuard implements CanActivate {
    private authService;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
