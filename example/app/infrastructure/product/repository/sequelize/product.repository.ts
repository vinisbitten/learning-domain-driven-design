import Product from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "../../../database/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  }

  async update(product: Product): Promise<void> {
    await ProductModel.update(
      {
        name: product.name,
        price: product.price,
      },
      { where: { id: product.id } }
    );
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id: id } });
    return new Product(productModel.id, productModel.name, productModel.price);
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();
    return productModels.map(
      (productModel) =>
        new Product(productModel.id, productModel.name, productModel.price)
    );
  }
}
