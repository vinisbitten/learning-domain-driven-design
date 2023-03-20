import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should have a valid id", () => {
    expect(() => {
      let customer = new Customer("", "John Doe");
    }).toThrowError("Id is required");
  });

  it("should have a valid name", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("Should change name", () => {
    let customer = new Customer("123", "John Doe");
    customer.changeName("Jane Doe");
    expect(customer.name).toBe("Jane Doe");
  });

  it("Should activate customer", () => {
    let customer = new Customer("123", "John Doe");
    let address = new Address("Street", 10, "City", "State", "Zip");
    customer.address = address;
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("Should throw error when address is undefined when activating a customer", () => {
    expect(() => {
      let customer = new Customer("123", "John Doe");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("Should deactivate customer", () => {
    let customer = new Customer("123", "John Doe");
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("Should add reward points", () => {
    let customer = new Customer("123", "John Doe");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
