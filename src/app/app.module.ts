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
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {NgMasonryGridModule} from 'ng-masonry-grid';
import {FlexLayoutModule} from '@angular/flex-layout';
import {YagaModule} from '@yaga/leaflet-ng2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingDialogComponent, ReservationComponent} from './reservation/reservation.component';
import {EnumToArrayPipe} from './enum-to-array.pipe';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {DevComponent} from './dev/dev.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AdminPhotosComponent} from './dev/admin.photos/admin.photos.component';
import {AdminReservationsComponent} from './dev/admin.reservations/admin.reservations.component';
import {PapaParseModule} from 'ngx-papaparse';
import {MenuComponent} from './menu/menu.component';

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
    LoadingDialogComponent,
    EnumToArrayPipe,
    DevComponent,
    AdminPhotosComponent,
    AdminReservationsComponent,
    MenuComponent,
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
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    PapaParseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoadingDialogComponent]
})
export class AppModule { }
