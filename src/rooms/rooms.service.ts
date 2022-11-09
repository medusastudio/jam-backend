import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) { }

  create(createRoomDto: CreateRoomDto) {
    return this.roomsRepository.create(createRoomDto);
  }

  save(room: Room) {
    return this.roomsRepository.save(room);
  }

  findAll() {
    return this.roomsRepository.find();
  }

  findOne(id: number) {
    return this.roomsRepository.findOne({ where: { id } })
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomsRepository.update(+id, updateRoomDto);
  }

  remove(id: number) {
    return this.roomsRepository.delete(+id);
  }
}
