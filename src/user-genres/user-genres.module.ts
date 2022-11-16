import { Module } from '@nestjs/common';
import { UserGenresService } from './user-genres.service';
import { UserGenresController } from './user-genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGenre } from './entities/user-genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserGenre])],
  controllers: [UserGenresController],
  providers: [UserGenresService],
})
export class UserGenresModule {}
