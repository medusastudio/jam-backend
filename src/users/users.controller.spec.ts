import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Country } from 'src/enums/countries.enum';

const UPDATE_ID = faker.datatype.uuid();

const createMockUser = ({ email, firstName, country, city }) => {
  const user = new User();

  user.id = faker.datatype.uuid();
  user.email = email;
  user.firstName = firstName;
  user.country = country;
  user.city = city;

  return user;
};

const mockUsers = [];

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  // Generates three random users
  beforeAll(() => {
    Array.from(Array(5)).forEach(() => {
      mockUsers.push(
        createMockUser({
          email: faker.internet.email(),
          firstName: faker.name.firstName(),
          country: faker.helpers.arrayElement(Object.values(Country)),
          city: 'Oslo',
        }),
      );
    });

    mockUsers[0].id = UPDATE_ID;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      jest.spyOn(service, 'findAll').mockImplementation(async () => mockUsers);
      expect(controller.findAll()).resolves.toBe(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user', () => {
      jest
        .spyOn(service, 'findById')
        .mockImplementation(async (id: string) =>
          mockUsers.find((user) => user.id === id),
        );

      expect(controller.findOne(UPDATE_ID)).resolves.toBe(mockUsers[0]);
    });
  });

  describe('update', () => {
    it('should update the user', () => {
      const updateUserDto = {
        email: 'ivan@gmail.com',
        firstName: 'Ivan',
        country: 'Germany',
        city: 'Berlin',
      };

      const user = mockUsers.find((user) => user.id === UPDATE_ID);

      jest
        .spyOn(service, 'update')
        .mockImplementation(
          async (id: string, updateUserDto: UpdateUserDto) => {
            const user = mockUsers.find((user) => user.id === id);
            return { ...user, ...updateUserDto };
          },
        );

      expect(controller.update(UPDATE_ID, updateUserDto)).resolves.toEqual({
        ...user,
        ...updateUserDto,
      });
    });
  });
});
