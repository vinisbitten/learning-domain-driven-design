import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("CustomerFactory unit tests", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("John Doe");

    expect(customer).toBeDefined();
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
  });

  it("should create a customer with id", () => {
    const customer = CustomerFactory.createWithId("123", "John Doe");

    expect(customer).toBeDefined();
    expect(customer.id).toBe("123");
    expect(customer.name).toBe("John Doe");
  });

  it("should create a customer with id and address", () => {
    const address = new Address(
      "Street 1",
      12345,
      "City",
      "Country",
      "123456789"
    );
    const customer = CustomerFactory.createWithIdAndAddress(
      "123",
      "John Doe",
      address
    );

    expect(customer).toBeDefined();
    expect(customer.id).toBe("123");
    expect(customer.name).toBe("John Doe");
    expect(customer.address).toBe(address);
  });
});
