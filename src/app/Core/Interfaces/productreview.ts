import { Category } from "./category"
import { ProductModel } from "./product"
import { Users } from "./User"

export interface ReviewModel{
    product:ProductModel,
    reviewid:number,
    category:Category,
    review:string
    user:Users
}