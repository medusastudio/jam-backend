import { InstrumentsController } from './instruments.controller';
import { InstrumentsService } from './instruments.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('InstrumentsController', () => {
  let controller: InstrumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstrumentsController],
      providers: [InstrumentsService],
    }).compile();

    controller = module.get<InstrumentsController>(InstrumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
