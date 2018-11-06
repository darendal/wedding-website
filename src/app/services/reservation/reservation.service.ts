import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Reservation} from '../../models/reservation';
import {of} from 'rxjs/internal/observable/of';
import {log} from 'util';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map, flatMap, mergeMap, take} from 'rxjs/operators';
import {first} from 'rxjs-compat/operator/first';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private readonly firebase: AngularFirestore) {}

  getReservationByName(name: string): Observable<Reservation> {
    return this.firebase.collection<Reservation>('reservations',
        ref => ref.where('name', '==', name).limit(1))
      .valueChanges()
      .pipe(map(o => o.pop()));
  }

  getRSVPNames(): Observable<string[]> {
    return this.firebase.collection<Reservation>('reservations').valueChanges()
      .pipe(
        map(o => o.map(u => u.name))
    );
  }

  saveReservation(reservation: Reservation): Observable<boolean> {
    return of(true);
  }
}
