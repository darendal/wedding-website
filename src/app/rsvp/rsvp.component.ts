import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {map, startWith} from 'rxjs/operators';
import {log} from 'util';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent implements OnInit {

  profileForm = new FormGroup({
    reservation: new FormControl('', Validators.required),
  });
  options: string[] = ['One', 'Two', 'Three'];
  constructor() { }

  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.profileForm.controls['reservation'].valueChanges
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
    log('form submitted');
  }

}
