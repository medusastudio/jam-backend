import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserGenresService } from './user-genres.service';
import { CreateUserGenreDto } from './dto/create-user-genre.dto';

@Controller('user-genres')
export class UserGenresController {
  constructor(private readonly userGenresService: UserGenresService) {}

  @Post()
  create(@Body() createUserGenreDto: CreateUserGenreDto) {
    return this.userGenresService.create(createUserGenreDto);
  }

  @Get()
  findAll() {
    return this.userGenresService.find();
  }

  @Delete(':userId/:genreId')
  remove(@Param('userId') userId: number, @Param('genreId') genreId: number) {
    return this.userGenresService.remove(+userId, +genreId);
  }
}