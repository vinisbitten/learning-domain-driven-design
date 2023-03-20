import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import customerCreatedEvent from "../customer-created.event";

export default class SendEmailWhenCustomerIsCreated2Handler
  implements EventHandlerInterface<customerCreatedEvent>
{
  handle(event: customerCreatedEvent): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
