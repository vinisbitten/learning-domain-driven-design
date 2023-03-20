import OrderFactory from "./order.factory";
import { v4 as uuid } from "uuid";

describe("OrderFactory unit tests", () => {
  it("should create an order", () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      itens: [
        {
          id: uuid(),
          name: "Product 1",
          productId: uuid(),
          quantity: 1,
          price: 10,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order).toBeDefined();
    expect(order.id).toBe(orderProps.id);
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.itens).toHaveLength(1);
  });
});
