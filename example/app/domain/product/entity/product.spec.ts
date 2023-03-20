import Product from "./product";

describe("Product unit test", () => {
  it("should have a valid id", () => {
    expect(() => {
      let product = new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  });

  it("should have a valid name", () => {
    expect(() => {
      let product = new Product("123", "", 100);
    }).toThrowError("Name is required");
  });

  it("should have a valid price", () => {
    expect(() => {
      let product = new Product("123", "Product 1", 0);
    }).toThrowError("Price must be greater than 0");
  });

  it("should change name", () => {
    let product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    let product = new Product("123", "Product 1", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});
