import {Component, OnInit} from '@angular/core';
import {Papa} from 'ngx-papaparse';
import {Reservation} from '../../models/reservation';
import {ReservationService} from '../../services/reservation/reservation.service';
import {MessageService} from '../../services/message/message.service';
import {PapaParseResult} from 'ngx-papaparse/lib/interfaces/papa-parse-result';

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
    reader.onload = () => this.handleResult(reader.result);
    reader.readAsText(this.file);
  }

  private handleResult(result: any) {
    this.papa.parse(result, {
      delimiter: ',',
      complete: (parseResult) => this.submitParsedData(parseResult),
    });
  }

  private submitParsedData(parsedResult: PapaParseResult) {

    const newReservations = parsedResult.data.map(v => Reservation.defaultReservation(v[0], v[1]));
    newReservations.map(reservation =>
      this.reservationService.putReservation(reservation)
        .then( result => {
          if (result) {
            this.messageService.showMessage(`Reservation for ${reservation.name} added successfully!`);
          } else {
            this.messageService.showMessage(`Error in reservation for ${reservation.name}`);
          }
        })
    );
  }

}
