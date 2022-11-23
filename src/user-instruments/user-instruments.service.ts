import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserInstrumentDto } from './dto/create-user-instrument.dto';
import { UserInstrument } from './entities/user-instrument.entity';

@Injectable()
export class UserInstrumentsService {
  constructor(
    @InjectRepository(UserInstrument)
    private userInstrumentsRepository: Repository<UserInstrument>,
  ) {}

  create(createUserInstrumentDto: CreateUserInstrumentDto) {
    return this.userInstrumentsRepository.create(createUserInstrumentDto);
  }

  save(userInstrument: UserInstrument) {
    return this.userInstrumentsRepository.save(userInstrument);
  }

  find(options?: FindManyOptions<UserInstrument>) {
    return this.userInstrumentsRepository.find(options);
  }

  findOne(userId: number, instrumentId: number) {
    return this.userInstrumentsRepository.findOne({
      where: { userId, instrumentId },
    });
  }

  remove(userId: number, instrumentId: number) {
    return this.userInstrumentsRepository.delete({ userId, instrumentId });
  }
}