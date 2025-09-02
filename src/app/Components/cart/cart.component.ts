import { Component, OnInit } from '@angular/core';
import { Product } from '../../Core/Interfaces/product';
import { CartService } from '../../Core/services/cart.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cart',
  imports: [MatCardModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
cartItem:Product[]=[]
constructor(private cartservice:CartService){}

ngOnInit(){
  this.cartservice.cart$.subscribe(item=>{
    this.cartItem=item;
  }) 
}
remove(index:number){
  this.cartservice.removeCart(index)
}
increment(item:Product){
    if(item.quantity < item.instock){
    item.quantity++
  }
}
decrement(item:Product){
    if(item.quantity > 0){
    item.quantity--
  }
  }
}
