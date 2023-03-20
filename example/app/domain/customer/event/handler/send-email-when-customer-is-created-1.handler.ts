import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import customerCreatedEvent from "../customer-created.event";

export default class SendEmailWhenCustomerIsCreated1Handler
  implements EventHandlerInterface<customerCreatedEvent>
{
  handle(event: customerCreatedEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}
