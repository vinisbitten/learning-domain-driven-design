import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "../../../database/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const costumerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    const address = new Address(
      "Street 1",
      1,
      "City 1",
      "State 1",
      "Zipcode 1"
    );
    customer.changeAddress(address);

    await costumerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
      state: customer.address.state,
    });
  });

  it("should update a customer", async () => {
    const costumerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    const address = new Address(
      "Street 1",
      1,
      "City 1",
      "State 1",
      "Zipcode 1"
    );
    customer.changeAddress(address);

    await costumerRepository.create(customer);

    customer.changeName("John Doe 2");
    customer.changeAddress(
      new Address("Street 2", 2, "City 2", "State 2", "Zipcode 2")
    );
    customer.activate();

    await costumerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
      state: customer.address.state,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    const address = new Address(
      "Street 1",
      1,
      "City 1",
      "State 1",
      "Zipcode 1"
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customerResult).toStrictEqual(customer);
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("123", "John Doe");
    const address1 = new Address(
      "Street 1",
      1,
      "City 1",
      "State 1",
      "Zipcode 1"
    );
    customer1.changeAddress(address1);
    const customer2 = new Customer("456", "John Doe 2");
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

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
