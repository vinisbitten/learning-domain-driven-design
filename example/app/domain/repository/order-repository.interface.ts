import RepositoryInterface from "./repository-interface"
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {
    addOrderItem(order: Order, item: OrderItem): Promise<void>;
    deleteOrderItem(orderItem: OrderItem): Promise<void>;
    updateOrderItemQuantity(orderItem: OrderItem): Promise<void>;
}