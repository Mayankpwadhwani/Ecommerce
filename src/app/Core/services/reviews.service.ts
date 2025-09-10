import { Injectable } from '@angular/core';
import { Review } from '../interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  reviewKey='reviews'

  constructor() {
    if(!localStorage.getItem(this.reviewKey)){
      localStorage.setItem(this.reviewKey,JSON.stringify([]))
    }
   }

   public getReviews():Review[]{
    const data =localStorage.getItem(this.reviewKey)
    return data ? JSON.parse(data) :[];
   }

   public saveReviews(reviews:Review){
    localStorage.setItem(this.reviewKey,JSON.stringify([reviews]))
   }

   public addReview(review:Review){
    const reviews=this.getReviews();
    reviews.push(review);
    this.saveReviews(review);
   }

   public getReviewByProduct(productId:number){
  


   }

}
