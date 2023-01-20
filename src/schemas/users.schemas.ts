import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UsersDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true, default: new Date() })
  dateReg: Date;

  @Prop({ required: false })
  dateLastLogin: Date;

  @Prop({ required: true, default: false })
  banned: boolean;

  _id: mongoose.Types.ObjectId | string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
