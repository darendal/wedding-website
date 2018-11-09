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
        complete: (parseResult) => parseResult.data.map(v =>
          this.reservationService.putReservation(Reservation.defaultReservation(v[0], v[1]))
            .then(result => {
                if (result) {
                  this.messageService.showMessage(`Reservation for ${v[0]} added successfully!`);
                } else {
                  this.messageService.showMessage(`Error in reservation for ${v[0]}`);
                }
              })
        )
      });
    };
    reader.readAsText(this.file);
  }

}
