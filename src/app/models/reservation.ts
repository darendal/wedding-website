import {Guest} from './guest';

export class Reservation {
  id: string;
  name: string;
  willAttend: boolean;
  guests: Guest[];
  maxGuests: number;
  modified: number;
  email: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.maxGuests = 2;
    this.willAttend = false;
    this.guests = [];
    this.email = null;
  }

  static defaultReservation(name: string, maxGuests: number): Reservation {
    return {
      id: null,
      name: name,
      willAttend: false,
      guests: [],
      maxGuests: maxGuests,
      modified: null,
      email: null
    };
  }
}
