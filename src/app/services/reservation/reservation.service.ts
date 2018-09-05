import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Reservation} from '../../models/reservation';
import {of} from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  getReservationByName(name: string): Observable<Reservation> {
    return of(new Reservation(0, name));
  }
}
