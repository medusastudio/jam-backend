import { Action } from './action.enum';
import {
  MongoAbility,
  defineAbility,
  InferSubjects,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Studio } from 'src/studios/entities/studio.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/role.enum';
import { Room } from 'src/rooms/entities/room.entity';
import { JwtPayload } from 'src/auth/jwt.strategy';

type Subjects =
  | InferSubjects<typeof Studio | typeof User | typeof Room>
  | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: JwtPayload) {
    return defineAbility<AppAbility>(
      (can, cannot) => {
        if (user.role === Role.Admin) {
          can(Action.Manage, 'all');
        } else {
          can(Action.Read, 'all');

          // Users
          can(Action.Manage, User, { id: user.sub });

          // Studios
          can(Action.Manage, Studio, { userId: user.sub });

          // Rooms
          // can(Action.Manage, Room, { studio: { user: { id: user } });
        }
      },
      {
        detectSubjectType: (object) =>
          object.constructor as ExtractSubjectType<Subjects>,
      },
    );
  }
}
