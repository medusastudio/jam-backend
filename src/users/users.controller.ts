import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenresService } from 'src/genres/genres.service';
import { InstrumentsService } from 'src/instruments/instruments.service';
import { In } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly genresService: GenresService,
    private readonly instrumentsService: InstrumentsService,
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { genreIds, instrumentIds } = createUserDto;
    const user = this.usersService.create(createUserDto);
    const genres = await this.genresService.findAll({ where: { id: In(genreIds || []) } });
    const instruments = await this.instrumentsService.findAll({ where: { id: In(instrumentIds || []) } });
    user.genres = genres;
    user.instruments = instruments;

    return this.usersService.save(user)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const { genreIds, instrumentIds } = updateUserDto;
    const user = await this.usersService.findOne(+id);
    const genres = await this.genresService.findAll({ where: { id: In(genreIds || []) } });
    const instruments = await this.instrumentsService.findAll({ where: { id: In(instrumentIds || []) } });
    user.genres = genres;
    user.instruments = instruments;

    return this.usersService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
