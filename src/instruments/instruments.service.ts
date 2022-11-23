import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { Instrument } from './entities/instrument.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/genres/entities/genre.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class InstrumentsService {
  constructor(
    @InjectRepository(Instrument)
    private instrumentsRepository: Repository<Instrument>,
  ) {}

  create(createInstrumentDto: CreateInstrumentDto) {
    return this.instrumentsRepository.create(createInstrumentDto);
  }

  save(instrument: Instrument) {
    return this.instrumentsRepository.save(instrument);
  }

  findAll(options?: FindManyOptions<Genre>) {
    return this.instrumentsRepository.find(options);
  }

  findOne(id: number) {
    return this.instrumentsRepository.findOne({ where: { id } });
  }

  update(id: number, updateInstrumentDto: UpdateInstrumentDto) {
    return this.instrumentsRepository.update(+id, updateInstrumentDto);
  }

  remove(id: number) {
    return this.instrumentsRepository.delete(+id);
  }
}
