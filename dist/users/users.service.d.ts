import { User, UsersDocument } from '../schemas/users.schemas';
import { Model } from 'mongoose';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
export declare class UsersService {
    private usersModel;
    constructor(usersModel: Model<UsersDocument>);
    login(loginUserDto: LoginUserDto): Promise<User | null>;
    registration(createUserDto: CreateUserDto): Promise<User | null>;
    findOneByEmail(email: string): Promise<User>;
    findOneById(id: string): Promise<User>;
    findAll(): Promise<User[]>;
    block(id: string): Promise<User>;
    unblock(id: string): Promise<User>;
    delete(id: string): Promise<void>;
}
