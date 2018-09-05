import { Component, OnInit, Input } from '@angular/core';
import {Reservation} from '../models/reservation';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {log} from 'util';
import {MealChoiceEnum} from '../models/mealChoice.enum';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  reservationForm: FormGroup;

  @Input() reservation: Reservation;

  MealChoiceEnum = MealChoiceEnum;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.reservationForm = this.fb.group({
      willAttend: this.fb.control(['']),
      guests: this.fb.array([])
    });

    if (this.reservation.guests.length > 0) {
      this.reservation.guests.forEach(guest => {
        this.addGuest(guest.name, guest.mealChoice);
      });
    } else {
      this.addGuest();
    }

    this.reservationForm.patchValue({
      willAttend: this.reservation.willAttend
    });


  }

  onSubmit(): void {
    log(this.reservationForm.value);
  }

  addGuest(guestName?: string, mealChoice?: MealChoiceEnum): void {
    const control = <FormArray>this.reservationForm.controls['guests'];

    const newGroup: FormGroup = this.fb.group({
      guestName: this.fb.control([guestName]),
      mealChoice: this.fb.control([mealChoice])
    });

    newGroup.patchValue({
      guestName: guestName,
      mealChoice: mealChoice
    });

    control.push(newGroup);

  }

  removeGuest(index: number): void {
    const control = <FormArray>this.reservationForm.controls['guests'];
    control.removeAt(index);
  }

  compareByValue(f1: string, f2: string) {
    return f1 === f2;
  }

}
