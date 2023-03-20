import { Sequelize } from "sequelize-typescript";

import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order-item";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../database/sequelize/model/customer.model";
import OrderItemModel from "../../../database/sequelize/model/order-item.model";
import OrderModel from "../../../database/sequelize/model/order.model";
import ProductModel from "../../../database/sequelize/model/product.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("123", "Customer 1");
    const address = new Address(
      "Street 1",
      1,
      "City 1",
      "State 1",
      "Zipcode 1"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["itens"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      itens: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should add a new item to a order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("123", "Customer 1");
    const address = new Address(
      "Street 1",
      1,
      "City 1",
      "State 1",
      "Zipcode 1"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    await orderRepository.create(order);

    const newProduct = new Product("456", "Product 2", 20);
    await productRepository.create(newProduct);

    const newOrderItem = new OrderItem(
      "2",
      newProduct.name,
      newProduct.price,
      newProduct.id,
      1
    );

    order.addItem(newOrderItem);

    await orderRepository.addOrderItem(order, newOrderItem);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["itens"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      itens: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
        {
          id: newOrderItem.id,
          name: newOrderItem.name,
          price: newOrderItem.price,
          quantity: newOrderItem.quantity,
          order_id: "123",
          product_id: "456",
        },
      ],
    });
  });

  it("should delete a item from a order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("123", "Customer 1");
    const address = new Address(
      "Street 1",
      1,
      "City 1",
      "State 1",
      "Zipcode 1"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("123", "Product 1", 10);
    const product2 = new Product("456", "Product 2", 20);

    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      1
    );

    const order = new Order("123", "123", [orderItem, orderItem2]);

    await orderRepository.create(order);

    order.removeItem(orderItem.id);

    await orderRepository.deleteOrderItem(order, orderItem);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["itens"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      itens: [
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: "123",
          product_id: "456",
        },
      ],
    });
  });

  it("should update the quantity of a item from a order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("123", "Customer 1");
    const address = new Address(
      "Street 1",
      1,
      "City 1",
      "State 1",
      "Zipcode 1"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);
    await orderRepository.create(order);

    order.changeItemQuantity(orderItem.id, 1);

    await orderRepository.updateOrderItemQuantity(order, orderItem);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["itens"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      itens: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: 1,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("123", "Customer 1");
    const address = new Address(
      "Street 1",
      1,
      "City 1",
      "State 1",
      "Zipcode 1"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("456", "Product 2", 20);
    const product3 = new Product("789", "Product 3", 50);

    await productRepository.create(product1);
    await productRepository.create(product2);
    await productRepository.create(product3);

    const orderItem1 = new OrderItem(
      "1",
      product1.name,
      product1.price,
      product1.id,
      2
    );

    const OrderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      1
    );

    const order = new Order("123", "123", [orderItem1, OrderItem2]);
    await orderRepository.create(order);

    const newOrderItem = new OrderItem(
      "3",
      product3.name,
      product3.price,
      product3.id,
      1
    );

    order.addItem(newOrderItem);
    order.changeItemQuantity("1", 1);
    order.removeItem("2");

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["itens"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      itens: [
        {
          id: orderItem1.id,
          name: orderItem1.name,
          price: orderItem1.price,
          quantity: 1,
          order_id: "123",
          product_id: "123",
        },
        {
          id: newOrderItem.id,
          name: newOrderItem.name,
          price: newOrderItem.price,
          quantity: 1,
          order_id: "123",
          product_id: "789",
        },
      ],
    });
  });
  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("123", "Customer 1");
    const address = new Address(
      "Street 1",
      1,
      "City 1",
      "State 1",
      "Zipcode 1"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id);

    expect(foundOrder).toStrictEqual(order);
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address(
      "Street 1",
      1,
      "City 1",
      "State 1",
      "Zipcode 1"
    );
    customer1.changeAddress(address1);

    const customer2 = new Customer("456", "Customer 2");
    const address2 = new Address(
      "Street 2",
      2,
      "City 2",
      "State 2",
      "Zipcode 2"
    );
    customer2.changeAddress(address2);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("456", "Product 2", 20);
    const product3 = new Product("789", "Product 3", 30);

    await productRepository.create(product1);
    await productRepository.create(product2);
    await productRepository.create(product3);

    const orderItem1 = new OrderItem(
      "1",
      product1.name,
      product1.price,
      product1.id,
      2
    );

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      1
    );

    const orderItem3 = new OrderItem(
      "3",
      product3.name,
      product3.price,
      product3.id,
      3
    );

    const order1 = new Order("123", "123", [orderItem1, orderItem2]);
    const order2 = new Order("456", "456", [orderItem3]);

    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2);
  });
});
