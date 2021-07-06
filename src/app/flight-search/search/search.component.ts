import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Airports, FlightQuery, FlightsProviderService } from 'src/app/flights-provider.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  availableAirports: Observable<Airports> | undefined;
  @Output() searchFlights = new EventEmitter<FlightQuery>();

  constructor(private flightsProvider: FlightsProviderService) { }

  ngOnInit(): void {
    this.availableAirports = this.flightsProvider.getAirports();
  }

  searchFlightsEmitted(searchQuery: FlightQuery): void {
    this.searchFlights.emit(searchQuery);
  }

}
