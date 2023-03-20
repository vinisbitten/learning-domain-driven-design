import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import { v4 as uuid } from "uuid";

export default class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length == 0) {
      throw new Error("No items in the order");
    }

    let order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }
}
