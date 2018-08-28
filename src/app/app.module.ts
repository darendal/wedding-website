import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { PhotosComponent } from './photos/photos.component';
import { EventsComponent } from './events/events.component';
import { TravelComponent } from './travel/travel.component';
import { RegistryComponent } from './registry/registry.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule, MatTabsModule, MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RsvpComponent,
    PhotosComponent,
    EventsComponent,
    TravelComponent,
    RegistryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
