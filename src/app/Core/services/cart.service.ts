import { Injectable } from '@angular/core';
import { ProductModel } from '../interfaces/product';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class CartService {
   storageKey = 'carts'; 
   cartItem: ProductModel[] = [];
   cartSubject = new BehaviorSubject<ProductModel[]>([]);
   cart$ = this.cartSubject.asObservable();
   currentUser: string | null = null;
  
  constructor() {
    this.setUser(localStorage.getItem('currentUser'));
  }

  public setUser(username: string | null) {
    this.currentUser = username;
    if (this.currentUser) {
      const carts = this.getAllCarts();
      this.cartItem = carts[this.currentUser] || [];
    } else {
      this.cartItem = [];
    }
    this.cartSubject.next([...this.cartItem]);
  }
  
  public addToCart(product: ProductModel) {
    this.cartItem.push(product);
    this.saveCart();
    this.cartSubject.next([...this.cartItem]);
  }

  public getCartItem(): ProductModel[] {
    return this.cartItem;
  }

  public removeCartItems(index: number) {
    this.cartItem.splice(index, 1);
    this.saveCart();
    this.cartSubject.next([...this.cartItem]);
  }

  public clearCart() {
    this.cartItem = [];
    this.saveCart();
    this.cartSubject.next([]);
  }

   getAllCarts(): Record<string, ProductModel[]> {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }

   saveAllCarts(carts: Record<string, ProductModel[]>) {
    localStorage.setItem(this.storageKey, JSON.stringify(carts));
  }

   saveCart() {
    if (this.currentUser) {
      const carts = this.getAllCarts();
      carts[this.currentUser] = this.cartItem;
      this.saveAllCarts(carts);
    }
  }
}
 