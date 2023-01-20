import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(
    context: ExecutionContext,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;
    const user = await this.authService.validateUser(email);

    if (!user) {
      throw new UnauthorizedException(
        `Пользователь c почтой ${email} не существует`,
      );
    }

    if (user.password !== password) {
      throw new UnauthorizedException(`Неправильный пароль`);
    }

    return true;
  }
}
