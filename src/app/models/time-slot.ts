import {Slot} from './slot';
import {SlotTime} from './slot-time';

export class TimeSlot {
  slot: Slot;
  timeSlots: SlotTime[];

  constructor(values = {}) {
    Object.assign(this, values);
  }

}
