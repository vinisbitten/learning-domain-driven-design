import OrderItem from "./order-item";

export default interface OrderInterface {
  get id(): string;

  get customerId(): string;

  get itens(): OrderItem[];
}
