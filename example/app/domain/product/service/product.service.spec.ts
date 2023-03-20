import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product unit test", () => {
  it("should change the prices of all products", () => {
    let product1 = new Product("123", "Product 1", 100);
    let product2 = new Product("456", "Product 2", 200);
    let product3 = new Product("789", "Product 3", 300);
    let products = [product1, product2, product3];

    ProductService.increasePrice(products, 10);

    expect(products[0].price).toBe(110);
    expect(products[1].price).toBe(220);
    expect(products[2].price).toBe(330);
  });
});
