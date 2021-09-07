import { IProduct } from "../product/product.model";

export interface IOrder {
    totalPrice: number
    items: Array<IBasketItem>
    options: Array<IOrderOption>;

    updateBasketItems(basket: IBasket): void;
    addOption(option: OrderOption, quantity: number): void;
    removeOption(option: OrderOption, quantity: number): void;
}

export interface IBasket {
    totalPrice: number
    totalItems: number
    items: Array<IBasketItem>
}

export interface IBasketItem {
    productId: number
    title: string
    price: number
    quantity: number
    image: string
    weight: string
}

export interface IOrderOption {
    option: OrderOption
    title: string
    quantity: number
}

export enum OrderOption {
    Persons,
    OriginalSushiStick,
    StudySushiSticks
}

export class Order implements IOrder {
    totalPrice: number = 0;
    items: IBasketItem[] = [];
    options: Array<IOrderOption> = [
        {
            option: OrderOption.Persons,
            title: "Кількість осіб",
            quantity: 1
        },
        {
            option: OrderOption.OriginalSushiStick,
            title: "Палички звичайні",
            quantity: 0
        },
        {
            option: OrderOption.StudySushiSticks,
            title: "Палички навчальні",
            quantity: 0
        }
    ];

    updateBasketItems(basket: IBasket) {
        this.totalPrice = basket.totalPrice;
        this.items = basket.items;
    }

    addOption(option: OrderOption, quantity: number) {
        let optionItem = this.options.find(p => p.option == option);

        if (optionItem) {
            optionItem.quantity += quantity;
        }
    }

    removeOption(option: OrderOption, quantity: number) {
        let optionItem = this.options.find(p => p.option == option);

        if (optionItem) {
            let optionMinQuantity = optionItem?.option == OrderOption.Persons ? 1 : 0;

            if (optionItem.quantity >= quantity + optionMinQuantity) {
                optionItem.quantity -= quantity;
            }
            else {
                optionItem.quantity = optionMinQuantity;
            }
        }
    }
}

export class Basket implements IBasket {
    totalPrice: number = 0;
    totalItems: number = 0;
    items: Array<IBasketItem> = [];

    // constructor() {
    //     this.items.push({
    //         productId: 1,
    //         title: "Тоторі",
    //         price: 1,
    //         quantity: 2,
    //         image: '',
    //         weight: '100 г'
    //     })
    // }

    addProductToBasket(product: IProduct, quantity: number) {
        let existingItem = this.items.find(p => p.productId == product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            let basketProduct: IBasketItem = {
                productId: product.id!,
                title: product.title,
                price: product.price,
                quantity: quantity,
                image: product.image,
                weight: product.weight
            }

            this.items.push(basketProduct);
        }

        this.recalculateItemFields();
    }

    removeBasketItem(productId: number, quantity: number) {
        let existingItem = this.items.find(p => p.productId == productId);

        if (existingItem && existingItem.quantity >= quantity) {
            existingItem.quantity -= quantity
        }

        if (existingItem?.quantity == 0) {
            let index = this.items.indexOf(existingItem);
            this.items.splice(index, 1)
        }

        this.recalculateItemFields();
    }

    removeAllItems(productId: number): void {
        let existingItem = this.items.find(p => p.productId == productId);

        if (existingItem) {
            let index = this.items.indexOf(existingItem);
            this.items.splice(index, 1)
        }

        this.recalculateItemFields();
    }

    private recalculateItemFields() {
        this.totalPrice = this.items.reduce((acc, cur) => {
            return acc += cur.price * cur.quantity
        }, 0)

        this.totalItems = this.items.length;
    }
}