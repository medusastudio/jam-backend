import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber } from "class-validator";
import { Country } from "src/countries.enum";

export class UpdateStudioDto {
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  coordinates?: string;

  @ApiProperty({
    required: false,
    nullable: true,
    enum: Country,
  })
  @IsOptional()
  @IsEnum(Country)
  country?: string;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  city?: string;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  userId?: string;
}
