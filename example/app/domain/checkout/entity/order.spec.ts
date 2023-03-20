import Order from "./order";
import OrderItem from "./order-item";

describe("Order unit test", () => {
  it("should have a valid id", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should have a valid customer id", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrowError("Customer is required");
  });

  it("should have a valid itens", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("Must have 1 or more itens");
  });

  it("item should have a valid quantity", () => {
    expect(() => {
      let item = new OrderItem("123", "123", 10, "123", 0);
      let order = new Order("123", "123", [item]);
    }).toThrowError("Quantity must be greater than 0");
  });

  it("should have a valid total", () => {
    let item1 = new OrderItem("123", "123", 10, "123", 1);
    let item2 = new OrderItem("123", "123", 20, "123", 2);

    let itens = [item1];

    let order1 = new Order("123", "123", itens);
    expect(order1.total()).toBe(10);

    itens.push(item2);

    let order2 = new Order("123", "123", itens);
    expect(order2.total()).toBe(50);
  });
});
