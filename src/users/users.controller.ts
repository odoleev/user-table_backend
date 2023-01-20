import {
  Controller, Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Req,
  Res,
  UseGuards
} from "@nestjs/common";
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(@Req() req, @Res() res) {
    const users = await this.usersService.findAll();

    return res.send(users);
  }

  @UseGuards(JwtGuard)
  @Patch('block/:id')
  @HttpCode(HttpStatus.OK)
  async blockUser(@Param('id') id: string) {
    return await this.usersService.block(id);
  }

  @UseGuards(JwtGuard)
  @Patch('unblock/:id')
  @HttpCode(HttpStatus.OK)
  async unblockUser(@Param('id') id: string) {
    return await this.usersService.unblock(id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
