import { ChangeDetectorRef, Component } from '@angular/core';
import { FlightQuery, Flights, FlightsProviderService } from '../flights-provider.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent {
  flights: Flights;
  flightsLoading = false;
  
  constructor(private flightsProvider: FlightsProviderService, private cd: ChangeDetectorRef) {
  }

  searchFlightsEmitted(searchQuery: FlightQuery): void {
    this.flightsLoading = true
    this.flightsProvider.getFlights(searchQuery).subscribe((flights: Flights) => {
      this.flights = flights;
      this.flightsLoading = false;
      this.cd.detectChanges();
    })
  }

}
