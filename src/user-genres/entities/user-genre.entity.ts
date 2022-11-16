import { Genre } from 'src/genres/entities/genre.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class UserGenre {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  genreId: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Genre)
  genre: Genre;
}
