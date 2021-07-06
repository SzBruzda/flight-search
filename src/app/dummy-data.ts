import { Airport, Airports } from "./flights-provider.service";

export const DUMMY_AIRPORTS: Airports = [
    {
      name: 'Warszawa Okęcie',
      shortName: 'WAW',
    },
    {
      name: 'Modlin',
      shortName: 'WMI',
    },
    {
      name: 'Wrocław',
      shortName: 'WRO',
    },
    {
      name: 'Poznań Ławica',
      shortName: 'POZ',
    },
    {
      name: 'Kraków Balice',
      shortName: 'KRK',
    },
    {
      name: 'Katowice Pyrzowice',
      shortName: 'KTW',
    },
    {
      name: 'Łódź Lublinek',
      shortName: 'LCJ',
    },
    {
      name: 'Gdańsk Rębiechowo',
      shortName: 'GDN',
    },
    {
      name: 'Bydgoszcz',
      shortName: 'BZG',
    },
    {
      name: 'Rzeszów Jasionka',
      shortName: 'RZE',
    },
    {
      name: 'Szczecin',
      shortName: 'SZZ',
    },
    {
      name: 'Zielona Góra',
      shortName: 'IEG',
    }
  ]

  export function getAirport(query: string | undefined): Airport | undefined {
    let airport;
    if (query !== 'undefined') {
      airport = DUMMY_AIRPORTS.find((airport: Airport) => airport.name === query || airport.shortName === query);
    } else {
      const dummyIndex = Math.floor(Math.random() * DUMMY_AIRPORTS.length);
      airport = DUMMY_AIRPORTS[dummyIndex];
    }
    return airport;
  }