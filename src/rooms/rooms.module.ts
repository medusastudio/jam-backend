import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room } from './entities/room.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studio } from 'src/studios/entities/studio.entity';
import { StudiosService } from 'src/studios/studios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Studio])],
  controllers: [RoomsController],
  providers: [RoomsService, StudiosService],
})
export class RoomsModule {}
