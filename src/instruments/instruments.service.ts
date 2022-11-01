import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/genres/entities/genre.entity';
import { Repository } from 'typeorm';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { Instrument } from './entities/instrument.entity';

@Injectable()
export class InstrumentsService {
  constructor(
    @InjectRepository(Instrument)
    private instrumentsRepository: Repository<Instrument>,
  ) {}

  create(createInstrumentDto: CreateInstrumentDto) {
    return this.instrumentsRepository.save(createInstrumentDto);
  }

  findAll() {
    return `This action returns all instruments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} instrument`;
  }

  update(id: number, updateInstrumentDto: UpdateInstrumentDto) {
    return `This action updates a #${id} instrument`;
  }

  remove(id: number) {
    return `This action removes a #${id} instrument`;
  }
}
