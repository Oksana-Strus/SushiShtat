import { IProduct } from "../product/product.model";

export enum PaymentType {
    Cash,
    Card,
    Online
}

export interface IOrder {
    totalPrice: number;
    items: Array<IBasketItem>;
    paymentType: PaymentType;
    callInDoor: boolean;
    callConfirm: boolean;
    options: Array<IOrderOption>;
    deliveryInfo?: IDeliveryInfo

    updateBasketItems(basket: IBasket): void;
    updateDeliveryInfo(info: IDeliveryInfo): void;
    addOption(option: OrderOption, quantity: number): void;
    removeOption(option: OrderOption, quantity: number): void;
}

export interface IDeliveryInfo {
    name: string,
    tel: number,
    address: string,
    house: number,
    appartaments: number,
    entrance: number,
    comment?: string,
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
    paymentType: PaymentType = PaymentType.Cash;
    callInDoor: boolean = true;
    callConfirm: boolean = true;
    items: IBasketItem[] = [];
    deliveryInfo?: IDeliveryInfo;
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

    updateDeliveryInfo(deliveryInfo: IDeliveryInfo): void {
        this.deliveryInfo = deliveryInfo;
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

    clear(): void {
        this.items = [];
        this.recalculateItemFields();
    }

    private recalculateItemFields() {
        this.totalPrice = this.items.reduce((acc, cur) => {
            return acc += cur.price * cur.quantity
        }, 0)

        this.totalItems = this.items.length;
    }
}