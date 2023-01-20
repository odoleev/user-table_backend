import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from '../schemas/users.schemas';
import { Model } from 'mongoose';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { LoginUserDto } from '../auth/dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UsersDocument>,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<User | null> {
    const user = await this.usersModel.collection.findOne({
      email: loginUserDto.email,
    });

    if (!user) {
      return null;
    }

    await this.usersModel.collection.findOneAndUpdate(
      { email: loginUserDto.email },
      {
        $set: {
          dateLastLogin: new Date(),
        },
      },
    );

    return user as User;
  }

  async registration(createUserDto: CreateUserDto): Promise<User | null> {
    const existingUser = await this.usersModel.collection.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      return null;
    }

    createUserDto.dateReg = new Date();
    createUserDto.id = uuidv4();
    createUserDto.banned = false;

    const createdUser = new this.usersModel(createUserDto);
    return createdUser.save();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersModel.findOne({ email });
  }

  async findOneById(id: string): Promise<User> {
    return this.usersModel.findOne({ id });
  }

  async findAll(): Promise<User[]> {
    return this.usersModel.find();
  }

  async block(id: string): Promise<User> {
    await this.usersModel.updateOne(
      { id: id },
      {
        $set: {
          banned: true,
        },
      },
    );

    return this.findOneById(id);
  }

  async unblock(id: string): Promise<User> {
    await this.usersModel.updateOne(
      { id: id },
      {
        $set: {
          banned: false,
        },
      },
    );

    return this.findOneById(id);
  }

  async delete(id: string): Promise<void> {
    await this.usersModel.deleteOne({ id: id });
  }
}
