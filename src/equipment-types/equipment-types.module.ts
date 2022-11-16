import { Module } from '@nestjs/common';
import { EquipmentTypesService } from './equipment-types.service';
import { EquipmentTypesController } from './equipment-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentType } from './entities/equipment-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipmentType])],
  controllers: [EquipmentTypesController],
  providers: [EquipmentTypesService],
})
export class EquipmentTypesModule {}
