import { Pipe, PipeTransform } from '@angular/core';
import { Airport } from './flights-provider.service';

@Pipe({
  name: 'airportName'
})
export class AirportNamePipe implements PipeTransform {

  transform(airport: Airport): string {
    return `${airport.name} (${airport.shortName})`;
  }

}
