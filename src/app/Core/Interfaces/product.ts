import { Category } from "./category"
import { Review } from "./review"

export interface ProductModel {
    id:number,
    name: string,
    price: number,
    discount: number,
    category:Category,
    instock: number,
    imageUrl: string,
    imageUrl1:string,
    quantity: number,
    reviews:Review[]

}