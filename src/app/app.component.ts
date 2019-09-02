import {Component, isDevMode} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  navLinks = [
      {path: 'home', label: 'Home', isActive: true},
      //{path: 'rsvp', label: 'RSVP', isActive: false},
      {path: 'photos', label: 'Photos', isActive: false},
      {path: 'events', label: 'Events', isActive: false},
      {path: 'menu', label: 'Menu', isActive: false},
      {path: 'travel', label: 'Travel', isActive: false},
      {path: 'registry', label: 'Registry', isActive: false},
    ];

  constructor() {
    if (isDevMode()) {
      this.navLinks.push({path: 'dev', label: 'Developer', isActive: false});
    }
  }
}
