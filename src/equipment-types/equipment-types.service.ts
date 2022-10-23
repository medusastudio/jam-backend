import { Injectable } from '@nestjs/common';
import { CreateEquipmentTypeDto } from './dto/create-equipment-type.dto';
import { UpdateEquipmentTypeDto } from './dto/update-equipment-type.dto';

@Injectable()
export class EquipmentTypesService {
  create(createEquipmentTypeDto: CreateEquipmentTypeDto) {
    return 'This action adds a new equipmentType';
  }

  findAll() {
    return `This action returns all equipmentTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipmentType`;
  }

  update(id: number, updateEquipmentTypeDto: UpdateEquipmentTypeDto) {
    return `This action updates a #${id} equipmentType`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipmentType`;
  }
}
