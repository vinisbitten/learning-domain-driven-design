import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import OrderInterface from "../entity/order.interface";

interface OrderFactoryProps {
  id: string;
  customerId: string;
  itens: {
    id: string;
    name: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
}

export default class OrderFactory {
  public static create(props: OrderFactoryProps): OrderInterface {
    const itens = props.itens.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.productId,
          item.quantity
        )
    );
    return new Order(props.id, props.customerId, itens);
  }
}
