import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../core/interfaces/product';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProductsService } from '../../core/services/products.service';
@Component({
  selector: 'app-create-product',
  imports: [FormsModule, MatDialogActions, MatLabel,
    MatFormField, MatDialogModule, MatInput, MatButtonModule, MatSelectModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit{

  product: ProductModel = {
    id:0,
    name: '',
    category: {id:0,name:''},
    price: 0,
    discount: 0,
    instock: 0,
    quantity: 1,
    imageUrl: '',
    imageUrl1:'',
    reviews:[]
  };
    categories: string[] = []
  
  
  constructor( private service:ProductsService,public dialogRef: MatDialogRef<CreateProductComponent>) { }


   ngOnInit(): void {
     const products=this.service.getProducts();
     this.categories=[...new Set(products.map(p=>p.category.name))]
   }

  save() {
    this.dialogRef.close(this.product);
    console.log(this.product.imageUrl)
  }

  cancel() {
    this.dialogRef.close();
  }
}
