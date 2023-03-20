import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import customerAddressChangedEvent from "../customer-address-changed.event";

export default class SendEmailWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface<customerAddressChangedEvent>
{
  handle(event: customerAddressChangedEvent): void {
    console.log(
      "Endereço do cliente: " +
        event.eventData.id +
        ", " +
        event.eventData.name +
        " alterado para " +
        event.eventData.address
    );
  }
}
