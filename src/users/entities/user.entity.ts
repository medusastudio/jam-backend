import { Country } from 'src/countries.enum';
import { Genre } from 'src/genres/entities/genre.entity';
import { Instrument } from 'src/instruments/entities/instrument.entity';
import { Studio } from 'src/studios/entities/studio.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName?: string;

  @Column({
    type: 'enum',
    enum: Country,
  })
  country: string;

  @Column()
  city: string;

  @OneToMany(() => Studio, (studio) => studio.user)
  studios: Studio[];

  @ManyToMany(() => Instrument, (instrument) => instrument.users, {
    cascade: true,
  })
  @JoinTable({ name: 'users_instruments' })
  instruments: Instrument[];

  @ManyToMany(() => Genre, (genre) => genre.users, { cascade: true })
  @JoinTable({ name: 'users_genres' })
  genres: Genre[];
}
