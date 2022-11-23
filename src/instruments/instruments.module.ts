import { InstrumentsService } from './instruments.service';
import { InstrumentsController } from './instruments.controller';
import { Instrument } from './entities/instrument.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Instrument])],
  controllers: [InstrumentsController],
  providers: [InstrumentsService],
})
export class InstrumentsModule {}
