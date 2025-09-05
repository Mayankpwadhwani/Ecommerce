import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../core/interfaces/product';
import { ProductsService } from '../../../core/services/products.service';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../../core/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-product-details',
  imports: [MatCardModule, MatButtonModule,MatExpansionModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})

export class ProductDetailsComponent implements OnInit {
  displayData: ProductModel[] = []
  filterDetails: ProductModel[] = []
  readonly panelOpenState = signal(false);

  constructor(private service: ProductsService, private route: ActivatedRoute, private cartservice: CartService,private snack:MatSnackBar) { }

  ngOnInit() {
    const name = String(this.route.snapshot.paramMap.get('name'));
    this.displayData = this.service.getProducts();
    this.filterDetails = this.displayData.filter(d => d.name === name);
  }

  public addToCart(item: ProductModel):void{
    this.cartservice.addToCart(item);
    this.snack.open('product added','close',{duration:2000})
  }
}


