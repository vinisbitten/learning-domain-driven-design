import CustomerInterface from "../entity/customer.interface";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import { v4 as uuid } from "uuid";

export default class CustomerFactory {
  public static create(name: string): CustomerInterface {
    return new Customer(uuid(), name);
  }

  public static createWithId(id: string, name: string): CustomerInterface {
    return new Customer(id, name);
  }

  public static createWithIdAndAddress(
    id: string,
    name: string,
    address: Address
  ): CustomerInterface {
    const customer = new Customer(id, name);
    customer.changeAddress(address);
    return customer;
  }
}
