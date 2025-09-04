import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../core/interfaces/product';
import { ProductsService } from '../../../core/services/products.service';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})

export class ProductDetailsComponent implements OnInit {
  displayData: ProductModel[] = []
  filterDetails: ProductModel[] = []

  constructor(private service: ProductsService, private route: ActivatedRoute, private cartservice: CartService) { }
  ngOnInit() {
    const name = String(this.route.snapshot.paramMap.get('name'));
    this.displayData = this.service.getProducts();
    this.filterDetails = this.displayData.filter(d => d.name === name);
  }

  public addToCart(item: ProductModel):void{
    this.cartservice.addToCart(item);
  }
}


