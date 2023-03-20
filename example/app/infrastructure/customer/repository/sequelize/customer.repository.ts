import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "../../../database/sequelize/model/customer.model";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(customer: Customer): Promise<void> {
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      street: customer.address.street,
      number: customer.address.number,
      city: customer.address.city,
      state: customer.address.state,
      zipcode: customer.address.zip,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  }

  async update(customer: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: customer.name,
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        state: customer.address.state,
        zipcode: customer.address.zip,
        active: customer.isActive(),
        rewardPoints: customer.rewardPoints,
      },
      { where: { id: customer.id } }
    );
  }

  async find(id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findOne({ where: { id: id } });

    const customer = new Customer(customerModel.id, customerModel.name);

    customer.changeAddress(
      new Address(
        customerModel.street,
        customerModel.number,
        customerModel.city,
        customerModel.state,
        customerModel.zipcode
      )
    );

    if (customerModel.active) {
      customer.activate();
    }

    customer.addRewardPoints(customerModel.rewardPoints);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    return customerModels.map((customerModel) => {
      let customer = new Customer(customerModel.id, customerModel.name);

      customer.changeAddress(
        new Address(
          customerModel.street,
          customerModel.number,
          customerModel.city,
          customerModel.state,
          customerModel.zipcode
        )
      );

      if (customerModel.active) {
        customer.activate();
      }

      customer.addRewardPoints(customerModel.rewardPoints);

      return customer;
    });
  }
}
