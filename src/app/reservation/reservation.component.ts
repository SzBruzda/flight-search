import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightData, FlightQuery, Flights, FlightsProviderService } from '../flights-provider.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  private dummyQuery: FlightQuery 
  private flightId: string | null;

  flightData: FlightData | undefined;
  flights: Flights;
  flightsLoading = false;
  loadingButton = false;
  
  constructor(private flightsProvider: FlightsProviderService, private router: Router, private route: ActivatedRoute,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setUpReservationData();
    this.setUpFlights();
  }

  refreshReservationData(id: string): void {
    this.flightData = this.flightsProvider.getFlight(id);
  }

  loadMoreFlights(): void {
    this.loadingButton = true;
    this.flightsProvider.getFlights(this.dummyQuery).subscribe((flights: Flights) => {
      this.flights = [...this.flights, ...flights];
      this.loadingButton = false;
      this.cd.detectChanges();
    })
  }

  private setUpReservationData(): void {
    this.flightId = this.route.snapshot.paramMap.get('id');
    this.flightData = this.flightsProvider.getFlight(this.flightId);
    if (!this.flightData) {
      this.router.navigate(['..', 'loty']);
    }
  }

  private setUpFlights(): void {
    this.dummyQuery = {
      ...this.flightData,
      cityOfDeparture: undefined,
      cityOfArrival: undefined
    } as FlightQuery

    this.flightsLoading = true

    this.flightsProvider.getFlights(this.dummyQuery).subscribe((flights: Flights) => {
      this.flights = flights;
      this.flightsLoading = false;
      this.cd.detectChanges();
    })
  }
}
