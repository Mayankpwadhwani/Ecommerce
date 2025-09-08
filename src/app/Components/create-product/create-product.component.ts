import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../core/interfaces/product';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { FormBuilder, FormsModule, PristineChangeEvent } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProductsService } from '../../core/services/products.service';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  imports: [FormsModule, MatDialogActions, MatLabel,ReactiveFormsModule,
    MatFormField, MatDialogModule, MatInput, MatButtonModule, MatSelectModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit{

  selectedFile: File | null = null;
  myForm!:FormGroup
  product: ProductModel = {
    id: 0,
    name: '',
    category: { id: 0, name: '' },
    price: 0,
    discount: 0,
    instock: 0,
    quantity: 1,
    imageUrl: '',
    imageUrl1: '',
    reviews: [],
    finalprice: 0
  };
    categories: string[] = []
  
  
  constructor( private service:ProductsService,public dialogRef: MatDialogRef<CreateProductComponent>,private fb:FormBuilder) { 
  this.myForm= new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(4)]),
    category:new FormControl('',[Validators.required,Validators.minLength(5)]),
    price:new FormControl('',[Validators.required,Validators.minLength(3)]),
    discount:new FormControl('',[Validators.required,Validators.minLength(3)]),
    inStock:new FormControl('',[Validators.required]),
    imageUrl:new FormControl('',[Validators.required]),
    imageUrl1:new FormControl('',[Validators.required]),

  })
  }

   ngOnInit(): void {
     const products=this.service.getProducts();
     this.categories=[...new Set(products.map(p=>p.category.name))]
   }

  public onSave():void  {
    if(this.myForm.valid){
      const formValue=this.myForm.value;
      const newProduct={
        id:0,
        name:formValue.name,
        category:{id:0,name:formValue.category},
        price:formValue.price,
        discount:formValue.discount,
        inStock:formValue.inStock,
        quantity:1,
        imageUrl:formValue.imageUrl,
        imageUrl1:formValue.imageUrl1
        
      }
      this.dialogRef.close(newProduct);
    }
  }

  public onCancel():void {
    this.dialogRef.close();
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile.name);
      // You can now perform further actions with the selectedFile, e.g., display a preview or prepare for upload.
    }
  }
}
