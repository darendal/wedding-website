import {Guest} from './guest';

export class Reservation {
  id: string;
  name: string;
  willAttend: boolean;
  guests: Guest[];
  maxGuests: number;
  modified: number;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.maxGuests = 2;
    this.willAttend = false;
    this.guests = [];
  }
}
