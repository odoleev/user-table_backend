import mongoose, { Document } from 'mongoose';
export type UsersDocument = User & Document;
export declare class User {
    email: string;
    password: string;
    username: string;
    id: string;
    dateReg: Date;
    dateLastLogin: Date;
    banned: boolean;
    _id: mongoose.Types.ObjectId | string;
}
export declare const UsersSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
