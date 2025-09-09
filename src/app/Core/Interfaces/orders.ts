import { ProductModel } from "./product"

export interface Orders{
    orderId:string,
    productdetail:ProductModel[],
    date:string
}