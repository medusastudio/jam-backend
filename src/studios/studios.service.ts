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
    private studioRepository: Repository<Studio>,
  ) { }

  create(createStudioDto: CreateStudioDto) {
    return this.studioRepository.create(createStudioDto);
  }

  findAll() {
    return this.studioRepository.find();
  }

  findOne(id: number) {
    return this.studioRepository.findOne({ where: { id } });
  }

  update(id: number, updateStudioDto: UpdateStudioDto) {
    return this.studioRepository.update(id, updateStudioDto);
  }

  remove(id: number) {
    return this.studioRepository.delete(id);
  }
}
