import { Injectable } from '@angular/core';
import {Event} from './event';

const events: Event[] = [
  {
    eventName: 'Wedding Ceremony',
    eventNumber: 1,
    dateTime: '1:00 pm, September 14th, 2019',
    locationName: 'Lantern Court - Holden Arboretum',
    address: '9203 Kirtland Chardon Rd, Kirtland, OH 44094',
    lat: 41.600340,
    long: -81.311980,
    directionLink: 'https://www.google.com/maps?saddr=My+Location&daddr=Lantern+Court+Holden+Arboretum+9203+Kirtland+Chardon+Rd+Kirtland+OH+44094'
  },
  {
    eventName: 'Brunch',
    eventNumber: 2,
    dateTime: '9:00 AM, September 15th, 2019',
    locationName: 'Best Western Plus Lawnfield Inn & Suites',
    address: '8434 Mentor Ave, Mentor, OH 44060',
    lat: 41.666383,
    long: -81.338717,
    directionLink: 'https://www.google.com/maps?saddr=My+Location&daddr=Lantern+Court+Holden+Arboretum+9203+Kirtland+Chardon+Rd+Kirtland+OH+44094'
  }
];

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  getEvents(): Event[] {
    return events;
  }
}