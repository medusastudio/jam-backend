import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studio } from 'src/studios/entities/studio.entity';
import { Room } from './entities/room.entity';
import { StudiosService } from 'src/studios/studios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Studio])],
  controllers: [RoomsController],
  providers: [RoomsService, StudiosService],
})
export class RoomsModule {}
