import {Injectable} from '@angular/core';
import {Reservation} from '../../models/reservation';
import {AngularFirestore} from '@angular/fire/firestore';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {LoggingService} from '../logging/logging.service';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly path = environment.reservation_path;

  constructor(private readonly firebase: AngularFirestore,
              private log: LoggingService,
              private http: HttpClient) {}

  getReservationByName(name: string): Observable<Reservation> {
    return this.firebase.collection<Reservation>(this.path,
        ref => ref.where('name', '==', name).limit(1))
      .snapshotChanges()
      .pipe(
        map( a => a.pop()), // Can pop, since limit will prevent more than 1 entry returning.
        map( a => {
          const res = a.payload.doc.data() as Reservation;
          res.id = a.payload.doc.id;
          return res;
        }),
        catchError(e => {
          this.log.error('Error fetching Reservation with name ' + name + ' from DB', e);
          return of(null);
        })
      );
  }

  getRSVPNames(): Observable<string[]> {
    return this.firebase.collection<Reservation>(this.path).valueChanges()
      .pipe(
        map(o => o.map(u => u.name)),
        catchError( err => {this.log.error('Error getting RSVP names', err); return []; })
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
      name: reservation.name,
      email: reservation.email ? reservation.email : ''
    };

    const reservationDoc = this.firebase.doc<Reservation>(`${this.path}/${update.id}`);

    return reservationDoc.update(update)
      .then(() => {
        this.log.debug('Reservation saved successfully!', update);
        return true;
      })
      .catch(e => {
        this.log.error('Error saving reservation', e);
        return false;
      });
  }

  putReservation(reservation: Reservation): Promise<boolean> {
    return this.firebase.collection<Reservation>(this.path).add(reservation)
      .then(() => true)
      .catch(e => {
        this.log.error('Error creating reservation', e);
        return false;
      });
  }

  sendEmail(reservation: Reservation): Promise<boolean> {
    if (reservation.email ) {
      return this.http.post(environment.emailFunctionAddress, reservation).toPromise()
        .then(() => true)
        .catch(() => false);
    } else {
      return new Promise<boolean>(() => true);
    }
  }

}

