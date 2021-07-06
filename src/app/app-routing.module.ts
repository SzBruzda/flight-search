import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/loty',
    pathMatch: 'full'
  },
  {
    path: 'loty',
    component: FlightSearchComponent
  }, 
  {
    path: 'rezerwacja/:id',
    component: ReservationComponent
  },
  {
    path: '**',
    redirectTo: '/loty'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
