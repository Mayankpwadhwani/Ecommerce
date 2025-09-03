import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../core/interfaces/product';
import { CartService } from '../../core/services/cart.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cart',
  imports: [MatCardModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItem: ProductModel[] = []
  constructor(private cartservice: CartService) { }

  ngOnInit() {
    this.cartservice.cart$.subscribe(item => {
      this.cartItem = item;
    })
  }

  remove(index: number) {
    this.cartservice.removeCart(index)
  }

  increment(item: ProductModel) {
    if (item.quantity < item.instock) {
      item.quantity++
    }
  }

  decrement(item: ProductModel) {
    if (item.quantity > 0) {
      item.quantity--
    }
  }
}
