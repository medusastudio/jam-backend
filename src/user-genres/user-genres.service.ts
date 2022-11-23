import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserGenreDto } from './dto/create-user-genre.dto';
import { UserGenre } from './entities/user-genre.entity';

@Injectable()
export class UserGenresService {
  constructor(
    @InjectRepository(UserGenre)
    private userGenresRepository: Repository<UserGenre>,
  ) {}

  create(createUserGenreDto: CreateUserGenreDto) {
    return this.userGenresRepository.create(createUserGenreDto);
  }

  save(userGenre: UserGenre) {
    return this.userGenresRepository.save(userGenre);
  }

  find(options?: FindManyOptions<UserGenre>) {
    return this.userGenresRepository.find(options);
  }

  findOne(userId: number, genreId: number) {
    return this.userGenresRepository.findOne({ where: { userId, genreId } });
  }

  remove(userId: number, genreId: number) {
    return this.userGenresRepository.delete({ userId, genreId });
  }
}