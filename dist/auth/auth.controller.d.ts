import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    loginUser(loginUserDto: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    registrationUser(createUserDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
