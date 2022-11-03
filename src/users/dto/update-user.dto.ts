import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  country?: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  city?: string;
}
