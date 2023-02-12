import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateUser, generateUsers } from './users.fixtures';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Country } from 'src/enums/countries.enum';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', () => {
      const createUserDto: CreateUserDto = {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        country: faker.helpers.arrayElement(Object.values(Country)),
        city: 'Oslo',
        password: faker.internet.password(),
      };
      const fakeUser = generateUser(createUserDto);

      const mockCreate = jest.fn();
      mockCreate.mockReturnValue(fakeUser);

      jest.spyOn(repository, 'create').mockImplementation(mockCreate);

      expect(service.create(createUserDto)).toEqual(fakeUser);
      expect(repository.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('save', () => {
    it('should save a user', () => {
      const createUserDto: CreateUserDto = {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        country: faker.helpers.arrayElement(Object.values(Country)),
        city: 'Oslo',
        password: faker.internet.password(),
      };
      const fakeUser = generateUser(createUserDto);

      const mockSave = jest.fn();
      mockSave.mockReturnValue(Promise.resolve(fakeUser));

      jest.spyOn(repository, 'save').mockImplementation(mockSave);

      expect(service.save(fakeUser)).resolves.toEqual(fakeUser);
      expect(repository.save).toHaveBeenCalledWith(fakeUser);
    });

    it('should throw an error if repository fails to save a user', () => {
      const error = new Error('Failed to save user');
      const fakeUser = generateUser({
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        country: faker.helpers.arrayElement(Object.values(Country)),
        city: 'Oslo',
        password: faker.internet.password(),
      });

      const mockSave = jest.fn();
      mockSave.mockReturnValue(Promise.reject(error));

      jest.spyOn(repository, 'save').mockImplementation(mockSave);

      expect(service.save(fakeUser)).rejects.toThrow(error);
      expect(repository.save).toHaveBeenCalledWith(fakeUser);
    });
  });

  describe('findAll', () => {
    const fakeUsers = generateUsers(5);
    const options: FindManyOptions<User> = {};

    it('should return an array of all users', () => {
      jest.spyOn(repository, 'find').mockResolvedValue(fakeUsers);

      expect(service.findAll(options)).resolves.toEqual(fakeUsers);
      expect(repository.find).toHaveBeenCalledWith(options);
    });

    it('should return an array of filtered users', async () => {
      const { city } = fakeUsers[0];
      const options: FindManyOptions<User> = {
        where: {
          city,
        },
      };
      const filteredUsers = fakeUsers.filter((user) => user.city === city);

      jest.spyOn(repository, 'find').mockResolvedValue(filteredUsers);

      expect(service.findAll(options)).resolves.toEqual(filteredUsers);
      expect(repository.find).toHaveBeenCalledWith(options);
    });

    it('should throw an error if repository fails to find users', async () => {
      const error = new Error('Failed to find users');
      jest.spyOn(repository, 'find').mockRejectedValue(error);

      expect(service.findAll(options)).rejects.toThrow(error);
      expect(repository.find).toHaveBeenCalledWith({});
    });
  });

  describe('findOne', () => {
    const fakeUsers = generateUsers(5);

    it('should return a single user based on options', async () => {
      const user = fakeUsers[0];
      const { id } = user;
      const options = { where: { id } };

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      expect(service.findOne(options)).resolves.toEqual(user);
      expect(repository.findOne).toHaveBeenCalledWith(options);
    });

    it('should return a single user based on options and only retrieve the first result', async () => {
      const user = fakeUsers[0];
      const options = { where: { email: user.email }, take: 1 };

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      expect(service.findOne(options)).resolves.toEqual(user);
      expect(repository.findOne).toHaveBeenCalledWith(options);
    });

    it('should return undefined if user is not found', () => {
      const options = { where: { id: 'non_existent_id' } };

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      expect(service.findOne(options)).resolves.toBeNull();
      expect(repository.findOne).toHaveBeenCalledWith(options);
    });

    it('should throw an error if finding a user fails', () => {
      const error = new Error('Failed to find user');
      const options = { where: { id: 'non_existent_id' } };

      jest.spyOn(repository, 'findOne').mockRejectedValue(error);

      expect(service.findOne(options)).rejects.toThrow(error);
      expect(repository.findOne).toHaveBeenCalledWith(options);
    });
  });

  describe('findById', () => {
    const fakeUsers = generateUsers(5);

    it('should return a single user based on id', () => {
      const user = fakeUsers[0];
      const { id } = user;

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      expect(service.findById(id)).resolves.toEqual(user);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('should return undefined if user is not found', () => {
      const id = 'non_existent_id';

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      expect(service.findById(id)).resolves.toBeNull();
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw an error if finding a user fails', () => {
      const error = new Error('Failed to find user');
      const id = 'non_existent_id';

      jest.spyOn(repository, 'findOne').mockRejectedValue(error);

      expect(service.findById(id)).rejects.toThrow(error);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('update', () => {
    it('should update a user', () => {
      const fakeUser = generateUser({
        city: 'Oslo',
      });
      const { id } = fakeUser;
      const updateUserDto: UpdateUserDto = { city: 'Stockholm' };
      const result = { ...fakeUser, ...updateUserDto };

      jest.spyOn(repository, 'save').mockResolvedValue(result);

      expect(service.update(id, updateUserDto)).resolves.toEqual(result);
      expect(repository.save).toHaveBeenCalledWith({ id, ...updateUserDto });
    });

    it('should throw an error if repository fails to update a user', () => {
      const error = new Error('Failed to update user');
      const fakeUser = generateUser();
      const { id } = fakeUser;
      const updateUserDto: UpdateUserDto = {};

      jest.spyOn(repository, 'save').mockRejectedValue(error);

      expect(service.update(id, updateUserDto)).rejects.toThrow(error);
      expect(repository.save).toHaveBeenCalledWith({ id, ...updateUserDto });
    });
  });
});
