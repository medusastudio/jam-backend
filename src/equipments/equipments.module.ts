import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';
import { Equipment } from './entities/equipment.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentType } from 'src/equipment-types/entities/equipment-type.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { EquipmentTypesService } from 'src/equipment-types/equipment-types.service';
import { RoomsService } from 'src/rooms/rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment, EquipmentType, Room])],
  controllers: [EquipmentsController],
  providers: [EquipmentsService, RoomsService, EquipmentTypesService],
})
export class EquipmentsModule {}
