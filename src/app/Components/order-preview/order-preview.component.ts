import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from '../../core/interfaces/product';
import { OrderPreview } from '../../core/interfaces/order-preview';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-preview',
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './order-preview.component.html',
  styleUrl: './order-preview.component.scss'
})
export class OrderPreviewComponent implements OnInit {

  orderForm!: FormGroup;
  cartItem: ProductModel[] = []
  totalAmount: number = 0;
  previewData: OrderPreview[] = [];

  constructor(private service: CartService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.cartItem = this.service.cartItem;
    this.totalAmount = this.cartItem.reduce((sum, item) => sum + (this.service.finalPrice(item) * item.quantity), 0)
    this.orderForm = this.fb.group({
      address: ['', [Validators.required, Validators.minLength(10)]],
      phoneNo: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
    });
  }

  public confirmOrder(): void {
    if (!this.orderForm.valid) {
      return;
    }
    const previewData: OrderPreview = {
      userEmail: this.service.currentUser || '',
      products: this.cartItem,
      totalamaount: this.totalAmount,
      address: this.orderForm.value.address,
      phoneNo: this.orderForm.value.phoneNo
    };
    localStorage.setItem('orderdetails', JSON.stringify(previewData))
    const success = this.service.placeOrder();
    if (success) {
      this.router.navigate(['/history'])
    }
  }

  public cancelPreview(){
    this.router.navigate(['/cart'])
  }
}