import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    nullable: true,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  country?: string;

  @ApiProperty({
    nullable: true,
  })
  @IsOptional()
  city?: string;
}
