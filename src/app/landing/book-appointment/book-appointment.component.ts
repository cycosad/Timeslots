import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../services/booking.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {

  purposes;

  constructor(
    private bookingService: BookingService,
  ) {}

  ngOnInit() {

    /**
     * Gets the purposes from the booking service
     */
    this.bookingService.getPurposes().subscribe((res) => {
      if (res && res.length > 0) {
        this.purposes = res;
      }
    });
  }

}
