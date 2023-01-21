import { UsersService } from '../users/users.service';
import { User } from '../schemas/users.schemas';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string): Promise<User | null>;
    generateToken(user: User): Promise<{
        accessToken: string;
    }>;
    verifyToken(token: string): any;
}
