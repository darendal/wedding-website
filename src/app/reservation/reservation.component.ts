import { Component, OnInit, Input } from '@angular/core';
import {Reservation} from '../models/reservation';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
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
      willAttend: this.fb.control([Validators.required]),
      guests: this.fb.array([])
    });

    if (this.reservation.guests.length > 0) {
      this.reservation.guests.forEach(guest => {
        this.addGuest(guest.name, guest.mealChoice);
      });
    } else {
      this.addGuest();
    }

    this.reservationForm.get('willAttend').valueChanges.subscribe(willAttend => {
      if (willAttend === 'true' || willAttend === true) {
        this.addGuestValidator();
      } else if (willAttend === 'false' || willAttend === false) {
        this.removeGuestValidator();
      }
    });

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
    this.addGuestValidator();

  }

  removeGuest(index: number): void {
    const control = <FormArray>this.reservationForm.controls['guests'];
    control.removeAt(index);
  }

  compareByValue(f1: string, f2: string) {
    return f1 === f2;
  }

  addGuestValidator(): void {
    const guestsControls = <FormArray>this.reservationForm.get('guests');

    guestsControls.controls.forEach((guestGroup: FormGroup) => {
      let control = guestGroup.get('guestName');
      control.setValidators([Validators.required]);
      control.updateValueAndValidity();
      control = guestGroup.get('mealChoice');
      control.setValidators([Validators.required]);
      control.updateValueAndValidity();
    });

  }

  removeGuestValidator(): void {
    const guestsControls = <FormArray>this.reservationForm.get('guests');

    guestsControls.controls.forEach((guestGroup: FormGroup) => {
      let control = guestGroup.get('guestName');
      control.clearValidators();
      control.updateValueAndValidity();
      control = guestGroup.get('mealChoice');
      control.clearValidators();
      control.updateValueAndValidity();
    });
  }

  hasError(index: number, field: string): boolean {
    const control = <FormArray>this.reservationForm.controls['guests'];
    return control.at(index).get(field).hasError('required');
  }

}
