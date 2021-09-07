export interface ICategory {
    id?: number,
    title: string,
    icon: string,
    image: string
}

export class Category implements ICategory {
    constructor(
        public title: string,
        public icon: string,
        public image: string
    ) { }
}