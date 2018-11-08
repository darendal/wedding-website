import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Reservation} from '../../models/reservation';
import {log} from 'util';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly path = environment.reservation_path;

  constructor(private readonly firebase: AngularFirestore) {}

  getReservationByName(name: string): Observable<Reservation> {
    return this.firebase.collection<Reservation>(this.path,
        ref => ref.where('name', '==', name).limit(1))
      .snapshotChanges()
      .pipe(
        map( a => a.pop()), // Can pop, since limit will prevent more than 1 entry returning.
        map( a => {
          const res = a.payload.doc.data() as Reservation;
          const id = a.payload.doc.id;
          res.id = id;
          return res;
        })
      );
  }

  getRSVPNames(): Observable<string[]> {
    return this.firebase.collection<Reservation>(this.path).valueChanges()
      .pipe(
        map(o => o.map(u => u.name))
    );
  }

  saveReservation(reservation: Reservation): Promise<boolean> {
    const guests = reservation.guests.map((obj) => Object.assign({}, obj));

    const update: Reservation = {
      id: reservation.id,
      willAttend: reservation.willAttend,
      modified: Date.now(),
      guests: guests,
      maxGuests: reservation.maxGuests,
      name: reservation.name
    };

    const reservationDoc = this.firebase.doc<Reservation>(`${this.path}/${update.id}`);

    return reservationDoc.update(update)
      .then(() => true)
      .catch(e => {
        log(e);
        return false;
      });
  }

}

