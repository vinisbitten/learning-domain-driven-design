import ProductFactory from "./product.factory";

describe("ProductFactory unity test", () => {
  it("should create a product type a", () => {
    const product = ProductFactory.create("a", "Product A", 10);

    expect(product).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a product type b", () => {
    const product = ProductFactory.create("b", "Product B", 10);

    expect(product).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(20);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should trhow an error when type is not valid", () => {
    expect(() => {
      ProductFactory.create("c", "Product C", 10);
    }).toThrowError("Invalid product type");
  });
});
