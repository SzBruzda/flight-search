import { NgxMatTimepickerComponent } from '@angular-material-components/datetime-picker';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Airport, Airports, FlightData, FlightQuery } from 'src/app/flights-provider.service';

const returnDateValidator = (fg: AbstractControl): ValidationErrors | null => {
    const departureDate = fg.get('departureDate');
    const returnDate = fg.get('returnDate');
    if (departureDate !== null && returnDate !== null && returnDate.value && departureDate && returnDate.value <= departureDate.value) {
      return {'invalidReturnDate': true}
    } 
    return null;
  }

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Input() selectedAirport: Airport;
  @Input() airports: Airports;
  @Input() flightData: FlightData | undefined
  @Output() searchFlights = new EventEmitter<FlightQuery>();
  searchForm: FormGroup
  isReservationForm: boolean;

  ngOnInit(): void {
    this.isReservationForm = !!this.flightData;
    this.searchForm = new FormGroup({
      cityOfDeparture: new FormControl({value: null, disabled: this.isReservationForm}, Validators.required),
      cityOfArrival: new FormControl({value: null, disabled: this.isReservationForm}, Validators.required),
      departureDate: new FormControl({value: null, disabled: this.isReservationForm}, Validators.required),
      returnDate: new FormControl({value: null, disabled: this.isReservationForm})
    }, returnDateValidator)
    this.flightData && this.searchForm.patchValue(this.flightData);   
  }

  submitForm(): void {    
    this.searchFlights.emit(this.searchForm.value);
  }
}
