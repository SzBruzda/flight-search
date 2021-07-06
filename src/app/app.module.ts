import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FakeInterceptor } from './fake.interceptor';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { ReservationComponent } from './reservation/reservation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { SearchComponent } from './flight-search/search/search.component';
import { FlightsListComponent } from './flights-list/flights-list.component';
import { MatSelectModule } from '@angular/material/select';
import { AirportNamePipe } from './airport-name.pipe';
import { SearchFormComponent } from './flight-search/search/search-form/search-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ReservationFormComponent } from './reservation/reservation-form/reservation-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    FlightSearchComponent,
    ReservationComponent,
    SearchComponent,
    FlightsListComponent,
    AirportNamePipe,
    SearchFormComponent,
    ReservationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: FakeInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
