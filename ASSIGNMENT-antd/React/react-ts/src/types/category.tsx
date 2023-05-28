import { IProduct } from "./products";

export interface ICategory {
    _id: string,
    name: string,
    image: string,
    products?: IProduct[]
}