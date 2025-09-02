import { Injectable } from '@angular/core';
import { Product } from '../Interfaces/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItem:Product[]=[]
  cartSubject=new BehaviorSubject<Product[]>(this.cartItem)
  constructor() { }

  cart$=this.cartSubject.asObservable();

addToCart(product:Product){
  this.cartItem.push(product);
  this.cartSubject.next([...this.cartItem])
}
getCartItem():Product[]{
  return this.cartItem;
}
removeCart(index:number){
  this.cartItem.splice(index,1);
  this.cartSubject.next([...this.cartItem])
}



}


