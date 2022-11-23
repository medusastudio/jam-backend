import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { StudiosModule } from './studios/studios.module';
import { RoomsModule } from './rooms/rooms.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { InstrumentsModule } from './instruments/instruments.module';
import { GenresModule } from './genres/genres.module';
import { EquipmentTypesModule } from './equipment-types/equipment-types.module';
import { Studio } from './studios/entities/studio.entity';
import { UsersModule } from './users/users.module';
import { Instrument } from './instruments/entities/instrument.entity';
import { Genre } from './genres/entities/genre.entity';
import { Room } from './rooms/entities/room.entity';
import { Equipment } from './equipments/entities/equipment.entity';
import { EquipmentType } from './equipment-types/entities/equipment-type.entity';
import { UserInstrumentsModule } from './user-instruments/user-instruments.module';
import { UserInstrument } from './user-instruments/entities/user-instrument.entity';
import { UserGenre } from './user-genres/entities/user-genre.entity';
import { UserGenresModule } from './user-genres/user-genres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'jam_postgres',
      port: 5432,
      username: 'medusa',
      password: 'medusa',
      database: 'jam',
      entities: [
        User,
        Studio,
        Instrument,
        Genre,
        Room,
        Equipment,
        EquipmentType,
        UserInstrument,
        UserGenre,
      ],
      synchronize: true,
      // dropSchema: true,
    }),
    UsersModule,
    StudiosModule,
    RoomsModule,
    EquipmentsModule,
    InstrumentsModule,
    GenresModule,
    EquipmentTypesModule,
    UserInstrumentsModule,
    UserGenresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
