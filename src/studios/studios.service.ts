import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { Studio } from './entities/studio.entity';

@Injectable()
export class StudiosService {
  constructor(
    @InjectRepository(Studio)
    private studiosRepository: Repository<Studio>,
  ) {}

  create(createStudioDto: CreateStudioDto) {
    return this.studiosRepository.create(createStudioDto);
  }

  save(studio: Studio) {
    return this.studiosRepository.save(studio);
  }

  findAll() {
    return this.studiosRepository.find();
  }

  findOne(id: number) {
    return this.studiosRepository.findOne({ where: { id } });
  }

  update(id: number, updateStudioDto: UpdateStudioDto) {
    return this.studiosRepository.update(+id, updateStudioDto);
  }

  remove(id: number) {
    return this.studiosRepository.delete(+id);
  }
}
