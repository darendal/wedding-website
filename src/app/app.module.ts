import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {RsvpComponent} from './rsvp/rsvp.component';
import {PhotosComponent} from './photos/photos.component';
import {EventsComponent} from './events/events.component';
import {TravelComponent} from './travel/travel.component';
import {RegistryComponent} from './registry/registry.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {NgMasonryGridModule} from 'ng-masonry-grid';
import {FlexLayoutModule} from '@angular/flex-layout';
import {YagaModule} from '@yaga/leaflet-ng2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReservationComponent} from './reservation/reservation.component';
import {EnumToArrayPipe} from './enum-to-array.pipe';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {DevComponent} from './dev/dev.component';
import {AngularFireAuthModule} from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RsvpComponent,
    PhotosComponent,
    EventsComponent,
    TravelComponent,
    RegistryComponent,
    ReservationComponent,
    EnumToArrayPipe,
    DevComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatDividerModule,
    HttpClientModule,
    NgMasonryGridModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    YagaModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
