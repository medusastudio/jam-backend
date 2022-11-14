import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstrumentsService } from './instruments.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';

@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Post()
  create(@Body() createInstrumentDto: CreateInstrumentDto) {
    const instrument = this.instrumentsService.create(createInstrumentDto);
    return this.instrumentsService.save(instrument);
  }

  @Get()
  findAll() {
    return this.instrumentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instrumentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstrumentDto: UpdateInstrumentDto) {
    return this.instrumentsService.update(+id, updateInstrumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instrumentsService.remove(+id);
  }
}
