import { StudiosService } from './studios.service';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('studios')
export class StudiosController {
  constructor(
    private readonly studiosService: StudiosService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createStudioDto: CreateStudioDto) {
    const user = await this.usersService.findOne(createStudioDto.userId);
    const studio = this.studiosService.create(createStudioDto);
    studio.user = user;
    return this.studiosService.save(studio);
  }

  @Get()
  findAll() {
    return this.studiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studiosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudioDto: UpdateStudioDto) {
    return this.studiosService.update(+id, updateStudioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studiosService.remove(+id);
  }
}
