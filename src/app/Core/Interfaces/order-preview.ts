import { ProductModel
 } from "./product";


 export interface OrderPreview{
     userEmail:string,
    products:ProductModel[],
    totalamaount:number,
    address:string,
    phoneNo:number

 }