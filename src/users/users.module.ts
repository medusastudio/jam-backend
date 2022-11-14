import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Instrument } from 'src/instruments/entities/instrument.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { InstrumentsService } from 'src/instruments/instruments.service';
import { GenresService } from 'src/genres/genres.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Instrument, Genre])],
  providers: [UsersService, InstrumentsService, GenresService],
  controllers: [UsersController],
})
export class UsersModule {}