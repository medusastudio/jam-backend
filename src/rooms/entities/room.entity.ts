import { Equipment } from "src/equipments/entities/equipment.entity";
import { Studio } from "src/studios/entities/studio.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @ManyToOne(() => Studio)
    studio: Studio

    @OneToMany(() => Equipment, epuipment => epuipment.room)
    equipments: Equipment[]
}
