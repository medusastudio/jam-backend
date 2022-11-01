import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber } from "class-validator";
import { Country } from "src/countries.enum";

export class UpdateStudioDto {
  @ApiProperty({
    nullable: true,
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  coordinates: string;

  @ApiProperty({
    nullable: true,
    enum: Country,
  })
  @IsOptional()
  @IsEnum(Country)
  country: string;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  city: string;
}
