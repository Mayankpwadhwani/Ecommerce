import { Injectable } from '@angular/core';
import { ProductModel } from '../interfaces/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItem:ProductModel[]=[];
  cartSubject=new BehaviorSubject<ProductModel[]>(this.cartItem);
  cart$=this.cartSubject.asObservable();

  constructor() { }

addToCart(product:ProductModel){
  this.cartItem.push(product);
  this.cartSubject.next([...this.cartItem])
}

getCartItem():ProductModel[]{
  return this.cartItem;
}

removeCart(index:number){
  this.cartItem.splice(index,1);
  this.cartSubject.next([...this.cartItem])
}
}


