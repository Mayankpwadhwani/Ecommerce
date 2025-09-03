import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../core/interfaces/product';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { category } from '../../core/interfaces/category';
import { MatSelectModule } from '@angular/material/select';
import { ProductsService } from '../../core/services/products.service';
@Component({
  selector: 'app-dialogbox',
  imports: [FormsModule, MatDialogActions, MatLabel,
    MatFormField, MatDialogModule, MatInput, MatButtonModule, MatSelectModule],
  templateUrl: './dialogbox.component.html',
  styleUrl: './dialogbox.component.scss'
})
export class DialogboxComponent implements OnInit{

  product: ProductModel = {
    name: '',
    category: '',
    price: 0,
    discount: 0,
    instock: 0,
    quantity: 1,
    imageUrl: '',
    imageUrl1:''
  };
    categories: string[] = []
  
  
  constructor( private service:ProductsService,public dialogRef: MatDialogRef<DialogboxComponent>) { }


   ngOnInit(): void {
     const products=this.service.getProducts();
     this.categories=[...new Set(products.map(p=>p.category))]
   }
  save() {
    this.dialogRef.close(this.product);
    console.log(this.product.imageUrl)
  }

  cancel() {
    this.dialogRef.close();
  }
}
