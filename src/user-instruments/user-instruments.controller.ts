import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserInstrumentsService } from './user-instruments.service';
import { CreateUserInstrumentDto } from './dto/create-user-instrument.dto';

@Controller('user-instruments')
export class UserInstrumentsController {
  constructor(
    private readonly userInstrumentsService: UserInstrumentsService,
  ) {}

  @Post()
  create(@Body() createUserInstrumentDto: CreateUserInstrumentDto) {
    return this.userInstrumentsService.create(createUserInstrumentDto);
  }

  @Get()
  findAll() {
    return this.userInstrumentsService.find();
  }

  @Delete(':userId/:instrumentId')
  remove(
    @Param('userId') userId: number,
    @Param('instrumentId') instrumentId: number,
  ) {
    return this.userInstrumentsService.remove(+userId, +instrumentId);
  }
}
