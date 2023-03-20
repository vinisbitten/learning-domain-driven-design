import EventInterface from "../../@shared/event/event.interface";
import Customer from "../../customer/entity/customer";

export default class customerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: Customer;

  constructor(eventData: Customer) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
