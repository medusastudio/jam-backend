import { Instrument } from './entities/instrument.entity';
import { InstrumentsService } from './instruments.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { generateInstrument } from './instruments.fixtures';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { REQUEST } from '@nestjs/core';
import { ForbiddenException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Role } from 'src/users/role.enum';
import { JwtPayload } from 'src/auth/jwt.strategy';

describe('InstrumentsService', () => {
  let service: InstrumentsService;
  let repository: Repository<Instrument>;
  let request: Request & { user: JwtPayload };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstrumentsService,
        {
          provide: CaslAbilityFactory,
          useClass: CaslAbilityFactory,
        },
        {
          provide: REQUEST,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Instrument),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<InstrumentsService>(InstrumentsService);
    repository = module.get<Repository<Instrument>>(
      getRepositoryToken(Instrument),
    );
    request = module.get(REQUEST);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an instrument', () => {
      const createInstrumentDto: CreateInstrumentDto = {
        name: 'Guitar',
      };
      const fakeInstrument = generateInstrument(createInstrumentDto);

      const mockCreate = jest.fn();
      mockCreate.mockReturnValue(fakeInstrument);

      jest.spyOn(repository, 'create').mockImplementation(mockCreate);

      expect(service.create(createInstrumentDto)).toEqual(fakeInstrument);
      expect(repository.create).toHaveBeenCalledWith(createInstrumentDto);
    });
  });

  describe('save', () => {
    it('should save a new instrument', () => {
      const createInstrumentDto: CreateInstrumentDto = {
        name: 'Guitar',
      };
      const fakeInstrument = generateInstrument(createInstrumentDto);
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.Admin,
      };

      const mockSave = jest.fn();
      mockSave.mockReturnValue(Promise.resolve(fakeInstrument));

      jest.spyOn(service, 'create').mockReturnValue(fakeInstrument);
      jest.spyOn(repository, 'save').mockImplementation(mockSave);

      expect(service.save(createInstrumentDto)).resolves.toEqual(
        fakeInstrument,
      );
      expect(repository.save).toHaveBeenCalledWith(fakeInstrument);
    });

    it('should throw a ForbiddenException if user is not authorized', () => {
      const createInstrumentDto: CreateInstrumentDto = {
        name: 'Guitar',
      };
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.User,
      };

      expect(() => service.save(createInstrumentDto)).toThrow(
        ForbiddenException,
      );
    });

    it('should throw an error if repository fails to save an instrument', () => {
      const error = new Error('Failed to save instrument');
      const fakeInstrument = generateInstrument();
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.Admin,
      };

      const mockSave = jest.fn();
      mockSave.mockReturnValue(Promise.reject(error));

      jest.spyOn(service, 'create').mockReturnValue(fakeInstrument);
      jest.spyOn(repository, 'save').mockImplementation(mockSave);

      expect(service.save(fakeInstrument)).rejects.toThrow(error);
      expect(repository.save).toHaveBeenCalledWith(fakeInstrument);
    });
  });

  describe('update', () => {
    it('should update an instrument', () => {
      const updateInstrumentDto: UpdateInstrumentDto = {
        name: 'Guitar',
      };
      const fakeInstrument = generateInstrument(updateInstrumentDto);
      const { id } = fakeInstrument;
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.Admin,
      };

      const mockUpdate = jest.fn();
      mockUpdate.mockReturnValue(Promise.resolve(fakeInstrument));

      jest.spyOn(repository, 'update').mockImplementation(mockUpdate);

      expect(service.update(id, updateInstrumentDto)).resolves.toEqual(
        fakeInstrument,
      );
      expect(repository.update).toHaveBeenCalledWith(id, updateInstrumentDto);
    });

    it('should throw a ForbiddenException if user is not authorized', () => {
      const updateInstrumentDto: UpdateInstrumentDto = {
        name: 'Guitar',
      };
      const fakeInstrument = generateInstrument(updateInstrumentDto);
      const { id } = fakeInstrument;
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.User,
      };

      expect(() => service.update(id, updateInstrumentDto)).toThrow(
        ForbiddenException,
      );
    });

    it('should throw an error if repository fails to update an instrument', () => {
      const error = new Error('Failed to update instrument');
      const fakeInstrument = generateInstrument();
      const { id } = fakeInstrument;
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.Admin,
      };

      const mockUpdate = jest.fn();
      mockUpdate.mockReturnValue(Promise.reject(error));

      jest.spyOn(repository, 'update').mockImplementation(mockUpdate);

      expect(service.update(id, {})).rejects.toThrow(error);
      expect(repository.update).toHaveBeenCalledWith(id, {});
    });
  });

  describe('remove', () => {
    it('should delete an instrument', () => {
      const fakeInstrument = generateInstrument();
      const { id } = fakeInstrument;
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.Admin,
      };

      const mockDelete = jest.fn();
      mockDelete.mockReturnValue(Promise.resolve());

      jest.spyOn(repository, 'delete').mockImplementation(mockDelete);

      expect(service.remove(id)).resolves.toBeUndefined();
      expect(repository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw a ForbiddenException if user is not authorized', () => {
      const fakeInstrument = generateInstrument();
      const { id } = fakeInstrument;
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.User,
      };

      expect(() => service.remove(id)).toThrow(ForbiddenException);
    });

    it('should throw an error if repository fails to delete an instrument', () => {
      const error = new Error('Failed to delete instrument');
      const fakeInstrument = generateInstrument();
      const { id } = fakeInstrument;
      request.user = {
        email: faker.internet.email(),
        sub: faker.datatype.uuid(),
        role: Role.Admin,
      };

      const mockDelete = jest.fn();
      mockDelete.mockReturnValue(Promise.reject(error));

      jest.spyOn(repository, 'delete').mockImplementation(mockDelete);

      expect(service.remove(id)).rejects.toThrow(error);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
