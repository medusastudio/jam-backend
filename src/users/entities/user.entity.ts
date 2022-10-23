import { Genre } from 'src/genres/entities/genre.entity';
import { Instrument } from 'src/instruments/entities/instrument.entity';
import { Studio } from 'src/studios/entities/studio.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column()
    country: string;
  
    @Column()
    city: string;

    @OneToMany(() => Studio, studio => studio.user)
    studios: Studio[];

    @ManyToMany(() => Instrument, instrument => instrument.user)
    instruments: Instrument[];

    @ManyToMany(() => Genre, genre => genre.user)
    genres: Genre[];
}
