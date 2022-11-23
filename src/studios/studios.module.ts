import { StudiosService } from './studios.service';
import { StudiosController } from './studios.controller';
import { Studio } from './entities/studio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Studio, User])],
  controllers: [StudiosController],
  providers: [StudiosService, UsersService],
})
export class StudiosModule {}
