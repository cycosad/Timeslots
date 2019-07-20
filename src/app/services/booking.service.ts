import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private http: HttpClient,
  ) {}

  /**
   * Gets purposes from the Mockroo
   */
  getPurposes(): Observable<any> {
    return this.http.get('https://my.api.mockaroo.com/purpose.json?key=d7051370');
  }

  /**
   * Gets time slots of a particular day
   */
  getTimeSlots(date): Observable<any> {
    return this.http.get(`https://my.api.mockaroo.com/timeslots/${date}.json?key=d7051370`);
  }

}
