export interface IProduct {
    id?: number,
    categoryId: number,
    title: string,
    description: string,
    weight: string,
    icon: string,
    image: string,
    price: number
}

export class Product implements IProduct {
    constructor(
        public title: string,
        public categoryId: number,
        public description: string,
        public weight: string,
        public icon: string,
        public image: string,
        public price: number
    ) { }
}


// export class Product1 implements IProduct {
//     public title: string;
//     public categoryId: number;
//     public description: string;
//     public icon: string;
//     public image: string;
//     public price: number;


//     constructor(title: string,
//         categoryId: number,
//         description: string,
//         icon: string,
//         image: string,
//         price: number

//     ) {
//         if (title === '') {
//             throw new Error('Title cannot be empty')
//         }


//         this.title = title;
//         this.categoryId = categoryId;
//         this.description = description;
//         this.icon = icon;
//         this.price = price;
//         this.image = image;
//     }
// }

// let title = '';
// let prod = new Product1(title, 0, `description for ${title}`, '', '', 0)