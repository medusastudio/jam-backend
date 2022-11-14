import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
  ) {}

  create(createGenreDto: CreateGenreDto) {
    return this.genresRepository.create(createGenreDto);
  }

  save(genre: Genre) {
    return this.genresRepository.save(genre);
  }

  findAll(options?: FindManyOptions<Genre>) {
    return this.genresRepository.find(options);
  }

  findOne(id: number) {
    return this.genresRepository.findOne({ where: { id } });
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return this.genresRepository.update(+id, updateGenreDto);
  }

  remove(id: number) {
    return this.genresRepository.delete(+id);
  }
}
