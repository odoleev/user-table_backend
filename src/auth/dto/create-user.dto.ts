import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  dateReg: Date;
  @IsNotEmpty()
  dateLastLogin: Date | string;
  @IsNotEmpty()
  banned: boolean;
  @IsNotEmpty()
  id: string;
}
