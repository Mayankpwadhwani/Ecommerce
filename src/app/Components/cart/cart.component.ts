import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../core/interfaces/product';
import { CartService } from '../../core/services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItem: ProductModel[] = [];

  constructor(private cartservice: CartService, private snack: MatSnackBar) { }

  ngOnInit() {
    this.cartservice.cart$.subscribe(item => {
      this.cartItem = item;
      console.log(item);
    })
  }

  public remove(index: number) {
    this.cartservice.removeCartItems(index);
  }

  public increment(item: ProductModel) {
    if (item.quantity < item.instock) {
      item.quantity++;
    }
  }

  public decrement(item: ProductModel) {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }

  public submitOrder(): void {
    this.cartservice.placeOrder();
    this.snack.open("Order placed", "close", { duration: 2000 })
  }
}
