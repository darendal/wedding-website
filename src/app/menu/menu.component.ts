import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';

interface MenuItem {name: string; description: string; }

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  readonly menu: Observable<MenuItem[]> = of([{name: 'Blackened Chicken', description: 'this is an example description'}]);

  constructor() { }

  ngOnInit() {
  }

}
