export interface IDiscount {
    id?: number,
    image: string
}

export class Discount implements IDiscount {
    constructor(
        public image:string
    ) { }
}