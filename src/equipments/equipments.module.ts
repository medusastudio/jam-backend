import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentType } from 'src/equipment-types/entities/equipment-type.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { EquipmentTypesService } from 'src/equipment-types/equipment-types.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { Equipment } from './entities/equipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment, EquipmentType, Room])],
  controllers: [EquipmentsController],
  providers: [EquipmentsService, RoomsService, EquipmentTypesService]
})
export class EquipmentsModule {}
