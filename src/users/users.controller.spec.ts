import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Country } from 'src/countries.enum';

const UPDATE_ID = '1';
let increment = 0;

const createMockUser = ({ email, firstName, country, city }) => {
  increment += 1;
  const user = new User();
  user.id = increment;
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

  beforeAll(() => {
    Array.from(Array(3)).forEach(() => {
      mockUsers.push(
        createMockUser({
          email: faker.internet.email(),
          firstName: faker.name.firstName(),
          country: faker.helpers.arrayElement(Object.values(Country)),
          city: 'Oslo',
        }),
      );
    });
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should update the user', () => {
      const createUserDto = {
        email: 'ivan@gmail.com',
        firstName: 'Ivan',
        country: 'Germany',
        city: 'Berlin',
      };

      const user = createMockUser(createUserDto);

      jest.spyOn(service, 'create').mockImplementation(() => user);

      jest.spyOn(service, 'save').mockImplementation(async (user: User) => ({
        ...user,
        ...createUserDto,
      }));

      expect(controller.create(createUserDto)).resolves.toEqual(user);
    });
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
        .spyOn(service, 'findOne')
        .mockImplementation(async (id: number) =>
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

      const user = mockUsers.find((user) => user.id === +UPDATE_ID);

      jest
        .spyOn(service, 'update')
        .mockImplementation(
          async (id: number, updateUserDto: UpdateUserDto) => {
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
