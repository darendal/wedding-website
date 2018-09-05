import {Guest} from './guest';

export class Reservation {
  id: number;
  name: string;
  willAttend: boolean;
  guests: Guest[];
  maxGuests: number;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.maxGuests = 2;
    this.willAttend = false;
    this.guests = [];
  }
}