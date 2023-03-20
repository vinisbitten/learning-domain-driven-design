import OrderInterface from "./order.interface";
import OrderItem from "./order-item";

export default class Order implements OrderInterface {
  private _id: string;
  private _customer: string;
  private _itens: OrderItem[];
  private _total: number;

  constructor(id: string, customer: string, itens: OrderItem[]) {
    this._id = id;
    this._customer = customer;
    this._itens = itens;
    this._total = this.total();
    this.validate();
  }

  validate(): boolean {
    if (this._id.length == 0) {
      throw new Error("Id is required");
    }
    if (this._customer.length == 0) {
      throw new Error("Customer is required");
    }
    if (this._itens.length == 0) {
      throw new Error("Must have 1 or more itens");
    }
    if (this._itens.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than 0");
    }

    return true;
  }

  total(): number {
    return this._itens.reduce(
      (total, item) => total + item.orderitemTotal(),
      0
    );
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customer;
  }

  get itens(): OrderItem[] {
    return this._itens;
  }

  set id(id: string) {
    this._id = id;
  }

  addItem(item: OrderItem): void {
    this._itens.push(item);
    this._total = this.total();
    this.validate();
  }

  removeItem(id: string): void {
    this._itens = this._itens.filter((item) => item.id !== id);
    this._total = this.total();
    this.validate();
  }

  changeItemQuantity(id: string, quantity: number): void {
    let item = this._itens.find((item) => item.id === id);
    if (item) {
      item.changeQuantity(quantity);
      this._total = this.total();
      this.validate();
    }
  }
}
