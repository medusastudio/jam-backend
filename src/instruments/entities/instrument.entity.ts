import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Instrument {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @ManyToMany(() => User)
    user: User
}
