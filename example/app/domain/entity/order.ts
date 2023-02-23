import OrderItem from './order_item';

export default class Order {
    private _id: string;
    private _customer: string;
    private _itens: OrderItem[];
    private _total: number;

    constructor(id: string, customer: string, items: OrderItem[]) {
        this._id = id;
        this._customer = customer;
        this._itens = items;
        this._total = this.total();
        this.validate();
    }

    validate(): boolean {
        if (this._id.length == 0) {
            throw new Error('Id is required');
        }
        if (this._customer.length == 0) {
            throw new Error('Customer is required');
        }
        if (this._itens.length == 0) {
            throw new Error('Must have 1 or more itens');
        }
        if (this._itens.some(item => item.quantity <= 0)) {
            throw new Error('Quantity must be greater than 0');
        }

        return true;
    }

    total(): number {
        return this._itens.reduce((total, item) => total + item.orderitemTotal(), 0);
    }
}