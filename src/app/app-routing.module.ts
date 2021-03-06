import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RsvpComponent} from './rsvp/rsvp.component';
import {PhotosComponent} from './photos/photos.component';
import {EventsComponent} from './events/events.component';
import {TravelComponent} from './travel/travel.component';
import {RegistryComponent} from './registry/registry.component';
import {DevComponent} from './dev/dev.component';
import {MenuComponent} from './menu/menu.component';

const routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home',     component: HomeComponent},
  {path: 'rsvp',     component: RsvpComponent},
  {path: 'photos',   component: PhotosComponent},
  {path: 'events',   component: EventsComponent},
  {path: 'travel',   component: TravelComponent},
  {path: 'registry', component: RegistryComponent},
  {path: 'dev',      component: DevComponent},
  {path: 'menu',     component: MenuComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
