import { Component, OnInit } from '@angular/core';
import {OSM_TILE_LAYER_URL} from '@yaga/leaflet-ng2';
import {EventsService} from '../services/events/events.service';
import {Event} from '../models/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event[];
  public tileLayerUrl: string = OSM_TILE_LAYER_URL;

  constructor(private eventService: EventsService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.events = this.eventService.getEvents();
  }

}
