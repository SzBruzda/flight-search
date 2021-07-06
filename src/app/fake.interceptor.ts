import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { getAirport } from './dummy-data';
import { Airport, FlightData, FlightQuery, Flights } from './flights-provider.service';

@Injectable()
export class FakeInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url === 'fake-data/flights') {
      const flights = this.generateFlights(FakeInterceptor.createFlightData(request.params))
      console.warn('Fake repspone for flights');
      return of(new HttpResponse({status: 200, body: flights}))
    } else if (request.url === 'fake-data/user') {
      const user = {
        firstName: 'Jan',
        lastName: 'Kowalski',
        cartItems: 0
      }
      console.warn('Fake repspone for User');
      return of(new HttpResponse({status: 200, body: user}))
    }
    
    return next.handle(request);
  }

  generateFlights(flightQuery: FlightQuery): Flights {
    return Array(10).fill(undefined).map((v: undefined, i: number) => ({
      id: `${i}`,
      cityOfDeparture: getAirport(flightQuery.cityOfDeparture) || {} as Airport,
      cityOfArrival: getAirport(flightQuery.cityOfArrival) || {} as Airport,
      departureDate: FakeInterceptor.generateDate(flightQuery.departureDate, i),
      returnDate: !flightQuery.returnDate ? flightQuery.returnDate : FakeInterceptor.generateDate(flightQuery.returnDate, i),
    })).sort((a: FlightData, b: FlightData) => a.departureDate > b.departureDate ? 1 : -1)
  }

  private static createFlightData(query: HttpParams): FlightQuery {
    return {
      cityOfDeparture: query.get('cityOfDeparture') || '',
      cityOfArrival: query.get('cityOfArrival') || '',
      departureDate: new Date(query.get('departureDate') || ''),
      returnDate: query.get('returnDate') !== 'undefined' && query.get('returnDate') !== 'null' ? new Date(query.get('returnDate') || '') : undefined
    }
  }

  private static generateDate(date: Date, i: number): Date {
    const minutes = Math.floor(Math.ceil(Math.random() * i * 20) / 5) * 5;
    return new Date(date.setMinutes(date.getMinutes() + minutes - date.getMinutes() % 5));
  }

}
