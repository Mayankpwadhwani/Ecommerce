import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductModel } from '../interfaces/product';
import { Orders } from '../interfaces/orders';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  storageKey = 'carts';
  orderKey = 'orders';
  cartItem: ProductModel[] = [];
  cartSubject = new BehaviorSubject<ProductModel[]>([]);
  cart$ = this.cartSubject.asObservable();
  currentUser: string | null = null;

  constructor() {
    this.setUser(localStorage.getItem('currentUser'));
  }

  public setUser(email: string | null) {
    this.currentUser = email;
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

  public placeOrder(): void {
    if (!this.currentUser || this.cartItem.length === 0) return;
    const newOrder: Orders = {
      orderId: Date.now().toString(36),
      productdetail: [...this.cartItem],
      total: this.cartItem.reduce((sum, p) => sum + (p.price * p.quantity), 0),
      date: new Date().toISOString()
    };
    const orders = this.getOrders();
    orders[this.currentUser] = orders[this.currentUser] || [];
    orders[this.currentUser].push(newOrder);
    localStorage.setItem(this.orderKey, JSON.stringify(orders));
    this.clearCart();
  }

  public getOrders(): Record<string, Orders[]> {
    const data = localStorage.getItem(this.orderKey);
    return data ? JSON.parse(data) : {};
  }

  public getUserOrders(email: string): Orders[] {
    const orders = this.getOrders();
    return orders[email] || [];
  }

  public getAllCarts(): Record<string, ProductModel[]> {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }

  public saveCart() {
    if (this.currentUser) {
      const carts = this.getAllCarts();
      carts[this.currentUser] = this.cartItem;
      localStorage.setItem(this.storageKey, JSON.stringify(carts));
    }
  }
}