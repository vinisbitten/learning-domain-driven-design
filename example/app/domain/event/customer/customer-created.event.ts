import EventInterface from "../@shared/event.interface";
import Customer from "../../entity/customer";

export default class customerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: Customer) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
