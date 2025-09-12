import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductModel } from '../interfaces/product';
import { Orders } from '../interfaces/orders';
import { ProductsService } from './products.service';

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

  constructor(private service: ProductsService) {
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

  public finalPrice(item: ProductModel) {
    return (item.price - ((item.discount * item.price) / 100))
  }

  public placeOrder(): boolean {
    if (!this.currentUser || this.cartItem.length === 0) return false;
    if(this.cartItem.some(item=>item.quantity<1)){
      alert("quantity cannot be zero");
      return false;
    }
    const products = this.service.getProducts();
    this.cartItem.forEach(cartProduct => {
      const index = products.findIndex(p => p.id === cartProduct.id);
      if (index !== -1) {
        const newStock = products[index].instock - cartProduct.quantity;
        products[index].instock = newStock >= 0 ? newStock : 0;
        this.service.updateProduct(products[index]);
      }
    })
    const newOrder: Orders = {
      orderId: Date.now().toString(36),
      productdetail: [...this.cartItem],
      date: new Date().toISOString()
    }; 
    const orders = this.getOrders();
    orders[this.currentUser] = orders[this.currentUser] || [];
    orders[this.currentUser].push(newOrder);
    localStorage.setItem(this.orderKey, JSON.stringify(orders));
    this.clearCart();
    return true;
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
public isInCart(product: ProductModel): ProductModel | null {
 return this.cartItem.find(p => p.id === product.id) || null;
}

public incrementQuantity(product: ProductModel): void {
 const item = this.cartItem.find(p => p.id === product.id);
 if (item && item.quantity < item.instock) {
   item.quantity++;
   this.saveCart();
   this.cartSubject.next([...this.cartItem]);
 }
}
public decrementQuantity(product: ProductModel): void {
 const item = this.cartItem.find(p => p.id === product.id);
 if (item && item.quantity > 0) {
   item.quantity--;
   this.saveCart();
   this.cartSubject.next([...this.cartItem]);
 }
}
}
