import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import productCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<productCreatedEvent>
{
  handle(event: productCreatedEvent): void {
    console.log("Sending email to .....");
  }
}
