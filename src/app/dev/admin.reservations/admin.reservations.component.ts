import {Component, OnInit} from '@angular/core';
import {Papa} from 'ngx-papaparse';
import {Reservation} from '../../models/reservation';
import {ReservationService} from '../../services/reservation/reservation.service';
import {MessageService} from '../../services/message/message.service';

@Component({
  selector: 'app-admin-reservations',
  templateUrl: './admin.reservations.component.html',
  styleUrls: ['./admin.reservations.component.css']
})
export class AdminReservationsComponent implements OnInit {

  file: File;

  constructor(private papa: Papa,
              private readonly reservationService: ReservationService,
              private readonly messageService: MessageService) { }

  ngOnInit() {
  }

  filesUploaded(event) {
    this.file = event.target.files[0];
  }

  submit(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.papa.parse(reader.result, {
        delimiter: ':',
        complete: (parseResult) => {
          const value: Promise<boolean>[] = parseResult.data
            .map(v => this.reservationService.putReservation(Reservation.defaultReservation(v[0], v[1])));

          Promise.all(value).then(values => {
            const result: boolean = !values.some( v => !v);
            if (result) {
              this.messageService.showMessage('All reservations added');
            } else {
              this.messageService.showMessage('There was a problem with 1 or more reservations');
            }
          } );
        }
      });
    };
    reader.readAsText(this.file);
  }

}
