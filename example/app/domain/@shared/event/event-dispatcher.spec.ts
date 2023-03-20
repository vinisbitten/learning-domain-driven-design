import EventDispatcher from "./event-dispatcher";

import ProductCreatedEvent from "../../product/event/product-created.event";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";

import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendEmailWhenCustomerIsCreated1Handler from "../../customer/event/handler/send-email-when-customer-is-created-1.handler";
import SendEmailWhenCustomerIsCreated2Handler from "../../customer/event/handler/send-email-when-customer-is-created-2.handler";

import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";
import SendEmailWhenCustomerAddressIsChangedHandler from "../../customer/event/handler/send-email-when-customer-address-is-changed.handler";

import Address from "../../customer/value-object/address"
import Customer from "../../customer/entity/customer";

describe("Domain events tests", () => {
  it("should register an event handler", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toMatchObject([eventHandler]);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toMatchObject([eventHandler]);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify product created event", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventhandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("productCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["productCreatedEvent"]
    ).toMatchObject([eventHandler]);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product name",
      description: "Product description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventhandler).toHaveBeenCalled();
  });

  it("should notify customer created event", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendEmailWhenCustomerIsCreated1Handler();
    const eventHandler2 = new SendEmailWhenCustomerIsCreated2Handler();
    const spyEventhandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventhandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("customerCreatedEvent", eventHandler1);
    eventDispatcher.register("customerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["customerCreatedEvent"]
    ).toMatchObject([eventHandler1, eventHandler2]);

    const customer = new Customer("123", "John Doe");

    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventhandler1).toHaveBeenCalled();
    expect(spyEventhandler2).toHaveBeenCalled();
  });

  it("should notify customer address changed event", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenCustomerAddressIsChangedHandler();
    const spyEventhandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("customerAddressChangedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["customerAddressChangedEvent"]
    ).toMatchObject([eventHandler]);

    const customer = new Customer("123", "John Doe");
    const address = new Address("street", 123, "city", "state", "zip");
    customer.changeAddress(address);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent(
      customer
    );

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventhandler).toHaveBeenCalled();
  });
});
