import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AirportNamePipe } from 'src/app/airport-name.pipe';
import { Airport, FlightData } from 'src/app/flights-provider.service';
import { UserInfoService } from 'src/app/user-info.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {
  private _flightData: FlightData | undefined;

  @Input() 
  get flightData(): FlightData | undefined { return this._flightData }
  set flightData(flightData: FlightData | undefined) {
    this.updateFlightData(flightData);
    this._flightData = flightData;
  };
  reservationForm: FormGroup;

  constructor(private userInfo: UserInfoService) { }

  ngOnInit(): void {
    this.reservationForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      peopleNumber: new FormControl(null, Validators.required),
      class: new FormControl(null, Validators.required),
      cityOfDeparture: new FormControl({value: null, disabled: true}, Validators.required),
      cityOfArrival: new FormControl({value: null, disabled: true}, Validators.required),
      departureDate: new FormControl({value: null, disabled: true}, Validators.required),
      returnDate: new FormControl({value: null, disabled: true})
    })
    this.updateFlightData(this.flightData);
  }

  submitForm(): void {    
    this.userInfo.updateCartList();
  }

  updateFlightData(flightData: FlightData | undefined): void {
    const dataForForm = {
      cityOfDeparture: this.transformAirport(flightData?.cityOfDeparture),
      cityOfArrival:  this.transformAirport(flightData?.cityOfArrival),
      departureDate: this.transformDate(flightData?.departureDate),
      returnDate: this.transformDate(flightData?.returnDate)
    }
    this.reservationForm && this.reservationForm.patchValue(dataForForm);
  }

  private transformAirport(airport: Airport | undefined): string {
    return airport ? new AirportNamePipe().transform(airport) : '';
  }

  private transformDate(date: Date | undefined): string | null {
    return new DatePipe('en-GB').transform(date, 'dd.MM.YY HH.mm');
  }
}
