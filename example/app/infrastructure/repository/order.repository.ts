
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderItemModel from "../database/sequelize/model/order-item.model";
import OrderModel from "../database/sequelize/model/order.model";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";

export default class OrderRepository implements OrderRepositoryInterface{
    async create(order: Order): Promise<void> {
        await OrderModel.create(
            {
              id: order.id,
              customer_id: order.customerId,
              total: order.total(),
              itens: order.itens.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
              })),
            },
            {
              include: [{ model: OrderItemModel }],
            }
          );
    }

    async addOrderItem(order: Order, item: OrderItem): Promise<void> {
        await OrderItemModel.create({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: order.id,
        });

        order.addItem(item);

        await OrderModel.update(
            {
              files: order.itens.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
              })),
              total: order.total(),
            },
            {
              where: { id: order.id },
            }
          );
    }

    async deleteOrderItem(order: Order, orderItem: OrderItem): Promise<void> {
        await OrderItemModel.destroy({
            where: { id: orderItem.id },
          });

        order.removeItem(orderItem.id);

        await OrderModel.update(
            {
              files: order.itens.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
              })),
              total: order.total(),
            },
            {
              where: { id: order.id },
            }
        );
    }

    async updateOrderItemQuantity(order: Order ,orderItem: OrderItem): Promise<void> {
        await OrderItemModel.update(
            {
              quantity: orderItem.quantity,
            },
            {
              where: { id: orderItem.id },
            }
          );
        
        order.changeItemQuantity(orderItem.id, orderItem.quantity);

        await OrderModel.update(
            {
              files: order.itens.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
              })),
              total: order.total(),
            },
            {
              where: { id: order.id },
            }
        );
    }

    async update(order: Order): Promise<void> {
        await OrderModel.update(
            {
              customer_id: order.customerId,
              total: order.total(),
              itens: order.itens.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
              })),
            },
            {
              where: { id: order.id },
            }
          );
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: { id: id },
            include: ["itens"],
        });

        const orderItens = orderModel.itens.map((item) => {
            return new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
            );
        });

        const order = new Order(
            orderModel.id,
            orderModel.customer_id,
            orderItens
        );

        return order;
    };

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: ["itens"],
        });

        const orders = orderModels.map((orderModel) => {
            const orderItens = orderModel.itens.map((item) => {
                return new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.product_id,
                    item.quantity
                );
            });

            const order = new Order(
                orderModel.id,
                orderModel.customer_id,
                orderItens
            );

            return order;
        });

        return orders;
    }
}