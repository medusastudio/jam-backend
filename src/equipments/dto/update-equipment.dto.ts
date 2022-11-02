import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateEquipmentDto {
  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  description: string;
}
