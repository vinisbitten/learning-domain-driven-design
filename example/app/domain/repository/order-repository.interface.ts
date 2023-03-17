import RepositoryInterface from "./repository-interface"
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {
    addOrderItem(order: Order, item: OrderItem): Promise<void>;
    deleteOrderItem(order: Order, orderItem: OrderItem): Promise<void>;
    updateOrderItemQuantity(order: Order, orderItem: OrderItem): Promise<void>;
}