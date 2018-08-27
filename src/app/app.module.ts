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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
