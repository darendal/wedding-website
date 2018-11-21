import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Reservation} from '../models/reservation';
import {ReservationService} from '../services/reservation/reservation.service';
import {MessageService} from '../services/message/message.service';
import {LoggingService} from '../services/logging/logging.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent implements OnInit {

  reservationLookupForm = new FormGroup({
    reservation: new FormControl('', Validators.required),
  });

  options: string[];

  filteredOptions: Observable<string[]>;

  reservation: Reservation;

  constructor(private reservationService: ReservationService,
              private messageService: MessageService,
              private readonly log: LoggingService) { }

  ngOnInit() {

    this.reservationService.getRSVPNames().subscribe(o => {
      this.options = o;
      this.filteredOptions = this.reservationLookupForm.controls['reservation'].valueChanges
        .pipe(
          startWith(''),
          map(val => this.filter(val))
        );
      },
e => this.log.error('Error getting RSVP names', e)
    );

  }

  filter(val: string): string[] {

    if (val.length < 1 ) {
      return [];
    }
    return this.options.filter(option => option.toLowerCase().includes(val.toLowerCase()));
  }

  onSubmit(): void {
    const name: string = this.reservationLookupForm.controls['reservation'].value;
    if (this.options.includes(name)) {
      this.reservationService.getReservationByName(name)
        .subscribe(res => this.reservation = res, e => this.log.error('Error on get reservation by name', e, name) );
    } else {
      this.log.debug('Invalid name selected from RSVP form', {name: name});
      this.messageService.showMessage('Please select a valid reservation name');
    }
  }

  formSubmitted(agreed: boolean): void {
    if (agreed) {
      this.reservationLookupForm.reset();
      this.reservation = null;
    }
  }

}
