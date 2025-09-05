import { ProductModel } from "./product"

export interface Orders{
    orderId:string,
    productdetail:ProductModel[],
    total:number,
    date:string
}