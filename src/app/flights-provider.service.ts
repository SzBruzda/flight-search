import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { DUMMY_AIRPORTS } from './dummy-data';

export interface Airport {
  name: string;
  shortName: string;
}

export type Airports = Array<Airport>;

export interface FlightQuery {
  cityOfDeparture: string | undefined;
  cityOfArrival: string | undefined;
  departureDate: Date;
  returnDate?: Date;
}

export interface FlightData {
  id: string;
  cityOfDeparture: Airport;
  cityOfArrival: Airport;
  departureDate: Date;
  returnDate?: Date;
}

export type Flights = Array<FlightData>;

export interface ReservationData extends FlightData{
  firstName: string;
  lastName: string;
  passengers: number;
  ticketClass: string;
}

@Injectable({
  providedIn: 'root'
})
export class FlightsProviderService {
  cachedFlights: Flights;

  constructor (private http: HttpClient) {}

  getFlights(flightData: FlightQuery): Observable<Flights> {
    const params = this.createQuery(flightData)
    return this.http.get<Flights>('fake-data/flights', {params}).pipe(
      tap((flights: Flights) => this.cachedFlights = flights),
      delay(1000)
    );
  }

  getAirports(): Observable<Airports> {
    return of(DUMMY_AIRPORTS)
  }

  getFlight(id: string | null): FlightData | undefined {
    return this.cachedFlights && this.cachedFlights.find((flight: FlightData) => flight.id === id);
  }

  private createQuery(data: FlightQuery): HttpParams {
    let params = new HttpParams();
    params = Object.entries(data).reduce((acc: HttpParams, [key, value]: [string, string | Date]) => {
      return acc.append(key, String(value))
    }, params);
    return params;
  }
}
