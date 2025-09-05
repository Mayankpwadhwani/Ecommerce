import { Component, OnInit } from '@angular/core';
import { Orders } from '../../core/interfaces/orders';
import { CartService } from '../../core/services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderhistory',
  imports: [MatCardModule,CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})

export class OrderhistoryComponent implements OnInit{
orders:Orders[]=[]

constructor(private cartService:CartService){}


ngOnInit(): void {
  const currentUser=localStorage.getItem('currentUser');
  if(currentUser){
    this.orders=this.cartService.getUserOrders(currentUser);
  }
}
}
