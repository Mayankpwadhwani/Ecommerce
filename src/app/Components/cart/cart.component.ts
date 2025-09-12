import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../core/interfaces/product';
import { CartService } from '../../core/services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../core/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItem: ProductModel[] = [];

  constructor(private cartservice: CartService, private snack: MatSnackBar,private service: ProductsService,private router:Router) { }

  ngOnInit() {
    this.cartservice.cart$.subscribe(item => {
      this.cartItem = item;
    })
  }

  public finalPrice(item: ProductModel) {
    return (item.price - ((item.discount * item.price) / 100))
  }

  public remove(index: number) {
    this.cartservice.removeCartItems(index);
  }

  public increment(item: ProductModel) {
    this.cartservice.incrementQuantity(item);
  }

  public decrement(item: ProductModel) {
    this.cartservice.decrementQuantity(item);
  }

  // public submitOrder(){
  //   const success=this.cartservice.placeOrder();
  //   if(success){
  //     this.snack.open("Order placed", "close", { duration: 2000 })
  //   }
  // }

  public orderPreview():void{
    if(this.cartItem.length===0){
      this.snack.open('empty cart','close',{duration:2000})
      return;
    }
    this.router.navigate(['/orderpreview'])

  }

  public isInCart(product:ProductModel){
    return this.cartservice.isInCart(product);
  }
  }
