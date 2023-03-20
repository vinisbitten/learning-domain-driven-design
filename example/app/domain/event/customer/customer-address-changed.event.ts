import EventInterface from "../@shared/event.interface";
import Customer from "../../entity/customer";

export default class customerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: Customer;

  constructor(eventData: Customer) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
