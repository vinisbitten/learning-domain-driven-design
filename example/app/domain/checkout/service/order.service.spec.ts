import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import OrderService from "./order.service";

describe("Order unit test", () => {
  it("should get total of all orders ", () => {
    let item1 = new OrderItem("123", "Item 1", 100, "Product 1", 2);
    let item2 = new OrderItem("456", "Item 2", 200, "Product 2", 3);
    let item3 = new OrderItem("789", "Item 3", 300, "Product 3", 4);

    let order1 = new Order("123", "Order 1", [item1]);
    let order2 = new Order("456", "Order 2", [item2, item3]);

    let total = OrderService.total([order1, order2]);

    expect(total).toBe(2000);
  });

  it("Should place an order", () => {
    let customer1 = new Customer("c1", "Customer 1");
    let item1 = new OrderItem("i1", "Item 1", 100, "P1", 2);

    let order = OrderService.placeOrder(customer1, [item1]);

    expect(customer1.rewardPoints).toBe(100);
    expect(order.total()).toBe(200);
  });
});
