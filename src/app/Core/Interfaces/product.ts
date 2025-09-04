import { Category } from "./category"

export interface ProductModel {
    id:number,
    name: string,
    price: number,
    discount: number,
    category:Category,
    instock: number,
    imageUrl: string,
    imageUrl1:string,
    quantity: number

}