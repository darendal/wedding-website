import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {map, startWith} from 'rxjs/operators';
import {Reservation} from '../models/reservation';
import {ReservationService} from '../services/reservation/reservation.service';
import {MessageService} from '../services/message/message.service';
import {LoggingService} from '../services/logging/logging.service';

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

    this.reservationService.getRSVPNames().subscribe(o => this.options = o,
      e => this.log.error('Error getting RSVP names', e));
    this.filteredOptions = this.reservationLookupForm.controls['reservation'].valueChanges
      .pipe(
        startWith(''),
        map(val => val.length >= 1 ? this.filter(val) : [])
      );
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
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
