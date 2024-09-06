import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto, ExportUserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<ExportUserDto[]> {
    return await this.userService.many({});
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ExportUserDto> {
    return await this.userService.one({ id });
  }

  @Post()
  async create(@Body() userData: CreateUserDto): Promise<ExportUserDto> {
    return this.userService.create(userData);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserDto,
  ): Promise<ExportUserDto> {
    return this.userService.update(id, userData);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ExportUserDto> {
    return this.userService.delete(id);
  }
}
