import { Category } from "./category"
import { Review } from "./review"

export interface ProductModel {
    id:number,
    name: string,
    price: number,
    discount: number,
    finalprice:number,
    category:Category,
    instock: number,
    images:string[],
    quantity: number,
    reviews:Review[]

}