import { InstrumentsService } from './instruments.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('InstrumentsService', () => {
  let service: InstrumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstrumentsService],
    }).compile();

    service = module.get<InstrumentsService>(InstrumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
