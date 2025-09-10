import { Users } from "./User"
import { ProductModel } from "./product"

export interface Review{
    id:number,
    userId:Users,
    productId:ProductModel
    comment:string,
    createdAt:Date
}

