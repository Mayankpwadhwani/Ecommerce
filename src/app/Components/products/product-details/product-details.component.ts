import { Component, OnInit, signal } from '@angular/core';
import { ProductModel } from '../../../core/interfaces/product';
import { ProductsService } from '../../../core/services/products.service';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../../core/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReviewsService } from '../../../core/services/reviews.service';
import { Review } from '../../../core/interfaces/review';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-product-details',
  imports: [MatCardModule, MatButtonModule, MatExpansionModule, MatLabel, MatFormFieldModule, CommonModule, MatInputModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})

export class ProductDetailsComponent implements OnInit {
  displayData: ProductModel[] = [];
  filterDetails: ProductModel[] = [];
  reviews: Review[] = [];
  readonly panelOpenState = signal(false);

  constructor(private service: ProductsService,private route: ActivatedRoute,
    private cartservice: CartService,private snack: MatSnackBar,private reviewservice: ReviewsService) {}

  ngOnInit(){
    const name = String(this.route.snapshot.paramMap.get('name'));
    this.displayData = this.service.getProducts();
    this.filterDetails = this.displayData.filter(d => d.name === name);
    if (this.filterDetails.length > 0) {
      const productId = this.filterDetails[0].id;
      this.loadReview(productId);
    }
  }

  public finalPrice(item: ProductModel){
    return item.price - (item.discount * item.price) / 100;
  }

  public addToCart(item: ProductModel): void {
    if(item.instock===0){
    this.snack.open('Product is out of stock ','close',{duration:1000})
  }else{
    this.cartservice.addToCart(item);
    this.snack.open('Product added', 'close', { duration: 2000 });
  }
}

  public isInCart(product: ProductModel){
    return this.cartservice.isInCart(product);
  }

  public increment(item: ProductModel){
    if (item.quantity < item.instock) {
      item.quantity++;
    }
  }

  public decrement(item: ProductModel){
    if (item.quantity > 0) {
      item.quantity--;
    }
  }

  public loadReview(productId: number): void {
    this.reviews = this.reviewservice.getReviewsByProduct(productId);
  }

  public addReview(productId: number, comment: string): void {
    if (!comment.trim()) {
      this.snack.open('Review cannot be empty', 'close', { duration: 2000 });
      return;
    }
    const newReview = this.reviewservice.addReview(productId, comment);
    if (newReview) {
      this.snack.open('Review added successfully', 'close', { duration: 2000 });
      this.loadReview(productId);
    } 
  }

  public delete(reviewId: number, productId: number): void {
    this.reviewservice.deleteReview(reviewId);
    this.reviews = this.reviewservice.getReviewsByProduct(productId);
    this.snack.open('Review deleted succesfully','close',{duration:1000})
  }
}