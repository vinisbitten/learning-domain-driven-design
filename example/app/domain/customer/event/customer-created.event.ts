import EventInterface from "../../@shared/event/event.interface";
import Customer from "../../customer/entity/customer";

export default class customerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: Customer) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
