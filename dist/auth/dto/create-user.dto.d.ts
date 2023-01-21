export declare class CreateUserDto {
    readonly username: string;
    readonly password: string;
    readonly email: string;
    dateReg: Date;
    dateLastLogin: Date | string;
    banned: boolean;
    id: string;
}
