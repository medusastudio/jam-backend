import { Country } from 'src/countries.enum';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Studio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  coordinates: string;

  @Column({
    type: 'enum',
    enum: Country,
  })
  country: string;

  @Column()
  city: string;

  @Column()
  booking: string;

  @ManyToOne(() => User)
  user: User

  @OneToMany(() => Room, room => room.studio)
  rooms: Room[]
}
