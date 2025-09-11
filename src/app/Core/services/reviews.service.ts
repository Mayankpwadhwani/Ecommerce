import { Injectable } from '@angular/core';
import { Review } from '../interfaces/review';
import { Users } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private storageKey = 'reviews';

  public getAllReviews(): Review[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  public saveReviews(reviews: Review[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(reviews));
  }

  public getReviewsByProduct(productId: number): Review[] {
    return this.getAllReviews().filter(r => r.productId === productId);
  }

  public addReview(productId: number, comment: string): Review | null {
    const currentUserEmail = localStorage.getItem('currentUser');
    const users: Users[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === currentUserEmail);
    if (!user) return null;
    const reviews = this.getAllReviews();
    const newReview: Review = {
      id: reviews.length > 0 ? reviews[reviews.length - 1].id + 1 : 1, 
      userId: user.id,
      productId,
      comment,
      createdAt: new Date(),
    };
    reviews.push(newReview);
    this.saveReviews(reviews);
    return newReview;
  }

  public updateReview(reviewId: number, newComment: string): boolean {
    const reviews = this.getAllReviews();
    const currentUserEmail = localStorage.getItem('currentUser');
    const users: Users[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === currentUserEmail);
    if (!user) return false;
    const reviewIndex = reviews.findIndex(r => r.id === reviewId && r.userId === user.id);
    if (reviewIndex === -1) return false;
    reviews[reviewIndex].comment = newComment;
    this.saveReviews(reviews);
    return true;
  }


  public deleteReview(reviewId: number): boolean {
    const reviews = this.getAllReviews();
    const currentUserEmail = localStorage.getItem('currentUser');
    const users: Users[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === currentUserEmail);
    if (!user) return false;
    const updatedReviews = reviews.filter(r => !(r.id === reviewId && r.userId === user.id));
    if (updatedReviews.length === reviews.length) return false;
    this.saveReviews(updatedReviews);
    return true;
  }
}
