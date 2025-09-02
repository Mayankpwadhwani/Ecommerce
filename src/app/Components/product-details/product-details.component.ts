import { Component, OnInit } from '@angular/core';
import { Product } from '../../Core/Interfaces/product';
import { ProductsService } from '../../Core/services/products.service';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../Core/services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
displayData:Product[]=[]
filterDetails:Product[]=[]

constructor(private service: ProductsService,private route:ActivatedRoute,private cartservice:CartService){}
ngOnInit(){
   const name=String(this.route.snapshot.paramMap.get('name'));
   this.displayData=this.service.getProducts();
    this.filterDetails=this.displayData.filter(d=>d.name===name);
      
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

  addToCart(item:Product){
    this.cartservice.addToCart(item);
  }
}


