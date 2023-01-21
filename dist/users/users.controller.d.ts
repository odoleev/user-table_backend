import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(req: any, res: any): Promise<any>;
    blockUser(id: string): Promise<import("../schemas/users.schemas").User>;
    unblockUser(id: string): Promise<import("../schemas/users.schemas").User>;
    deleteUser(id: string): Promise<void>;
}
