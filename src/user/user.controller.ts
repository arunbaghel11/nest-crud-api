import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post('createuser')
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }
  @Delete('deleteuser/:id')
  async deleteUser(@Param() param) {
      return await this.userService.deleteUser(param.id);
  }

  @Get('getalluser')
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Get('getuser/:id')
  async getUserById(@Param() param) {
    return await this.userService.getUserById(param.id);
  }
}
