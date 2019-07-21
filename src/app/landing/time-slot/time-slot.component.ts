import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {SlotTime} from '../../models/slot-time';
import {TimeSlot} from 'src/app/models/time-slot';
import {Slot} from '../../models/slot';
import {BookingService} from '../../services/booking.service';

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.scss']
})
export class TimeSlotComponent implements OnInit {

  moment = moment;

  /**
   * Sets today as default value and convert it into ngb date format
   * example - {day: 1, month: 12, year: '2019'}
   */
  dateData = this.convertToNgbDateObject(moment().startOf('day'));

  timeSlots: TimeSlot[];
  slots: Slot[] = [
    {
      src: '',
      name: 'Morning',
    },
    {
      src: '',
      name: 'Evening',
    },
    {
      src: '',
      name: 'Night',
    },
  ];

  constructor(
    private bookingService: BookingService,
  ) {}

  ngOnInit() {
    /**
     * Generates the time slots and availability
     */
    this.generateTimeSlots(this.dateData);
  }

  /**
   * On date select generates the time slots and availability
   */
  onDateSelect(date) { // converting it to YYYY-MM-DD
    this.generateTimeSlots(this.convertToDate(date));
  }

  /**
   * On date change using arrows generates the time slots and availability
   */
  changeDate(flag) {
    if (flag) {
      this.dateData = this.convertToNgbDateObject(this.convertToDate(this.dateData).add(1, 'day'));
    } else {
      this.dateData = this.convertToNgbDateObject(this.convertToDate(this.dateData).subtract(1, 'day'));
    }
    this.generateTimeSlots(this.convertToDate(this.dateData));
  }

  /**
   * Convert date into ngb date format
   * example - {day: 1, month: 12, year: '2019'}
   */
  convertToNgbDateObject(date) {
    return {
      day: parseInt(moment(date).format('DD'), 10),
      month: parseInt(moment(date).format('MM'), 10),
      year: parseInt(moment(date).format('YYYY'), 10)
    }
  }

  /**
   * Changes date format
   */
  convertToDate(date) {
    return moment(date.year + '-' + date.month + '-' + date.day, 'YYYY-MM-DD');
  }

  /**
   * Generates the time slots and availability
   */
  generateTimeSlots(date) {
    this.timeSlots = [];

    /**
     * Gets time slots and availability from booking service
     */
    this.bookingService.getTimeSlots(moment(date).format('YYYY-MM-DD')).subscribe((res) => {
      console.log(res);
      let startTime = moment(date).add(10, 'hours').format('X'); // adding 10 hours so that it starts at 10am
      const endTime = moment(date).add(23.5, 'hours').format('X'); // till 11:30 pm
      let i = 0;
      let slotTime: SlotTime[] = [];
      let temp = [];

      /**
       * Creates 3 categories(morning, evening, night) each with 9 time slots
       * example:
       * [
       *  {
       *    slot: {src: '', name: 'Morning'},
       *    timeSlots: [
       *      {time: '3600', status: 'AVAILABLE'},
       *      {time: '12000', status: 'AVAILABLE'},
       *      .
       *      .
       *    ],
       *  },
       *  .
       *  .
       * ]
       *
       */
      while (startTime < endTime) {
        slotTime.push({
          time: startTime,
          status: this.checkSlot(date, startTime, res), // checks for the availability with API data
        });
        if ((i + 1) % 3 === 0) {
          temp.push(slotTime);
          slotTime = [];
        }
        startTime = moment(startTime, 'X').add(30, 'minutes').format('X');
        if ((i + 1) % 9 === 0) {
          this.timeSlots.push({
            slot: this.slots[Math.floor(i / 9)],
            timeSlots: temp
          });
          temp = [];
        }
        i++;
      }
    });
  }

  /**
   * time from from API is sent in seconds
   * this will be added to the date variable(start of the day)
   * result will be checked with the time slot(startTime)
   * if match found status will be added
   * default status 'UNAVAILABLE'
   */

  checkSlot(date, startTime, res) {
    const temp = res.timeSlots.find((item) => {
      return moment(date).add(item.time, 'seconds').format('X') === startTime;
    });
    return temp && temp.status ? temp.status : 'UNAVAILABLE';
  }

}

