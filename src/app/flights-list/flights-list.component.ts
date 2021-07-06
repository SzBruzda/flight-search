import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { Flights } from '../flights-provider.service';

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.scss']
})
export class FlightsListComponent implements OnInit, OnDestroy {
  @Input() flights: Flights | null;
  @Input() reservationView: boolean;
  @Input() loading: boolean;
  @Output() flightClicked = new EventEmitter<string>();
  flights$: Observable<Flights>;
  displayedColumns: string[] = ['cityOfDeparture', 'cityOfArrival', 'departureDate', 'returnDate', 'id'];
  placeHolderData: Array<undefined>;
  compactTable = false;
  eventSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.compactTable = this.reservationView || window.innerWidth < 720;
    if (!this.reservationView) {
      this.eventSubscription = fromEvent(window, 'resize').subscribe((event) => {
        this.compactTable = (<Window>event.currentTarget).innerWidth < 720;
      })
    }
  }

  ngOnDestroy(): void {
    this.eventSubscription && this.eventSubscription.unsubscribe();
  }

  goToReservation(id: string): void {
    if (this.reservationView) {
      this.flightClicked.emit(id);
    } else {
      this.router.navigate(['..', 'rezerwacja', id], {relativeTo: this.route});
    }
  }
}
