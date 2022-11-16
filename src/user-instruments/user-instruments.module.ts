import { Module } from '@nestjs/common';
import { UserInstrumentsService } from './user-instruments.service';
import { UserInstrumentsController } from './user-instruments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInstrument } from './entities/user-instrument.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInstrument])],
  controllers: [UserInstrumentsController],
  providers: [UserInstrumentsService],
})
export class UserInstrumentsModule {}
