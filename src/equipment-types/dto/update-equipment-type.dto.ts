import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateEquipmentTypeDto {
  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  name?: string;
}
