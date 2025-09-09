import { Component, Inject, OnInit } from '@angular/core';
import { ProductModel } from '../../core/interfaces/product';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProductsService } from '../../core/services/products.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  imports: [FormsModule, MatDialogActions, MatLabel, ReactiveFormsModule,
    MatFormField, MatDialogModule, MatInput, MatButtonModule, MatSelectModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit {

  selectedFile: File[] = []
  imagePreviews: string[] = []
  myForm!: FormGroup
  product: ProductModel[] = []
  categories: string[] = []
  isEdit = false;

  constructor(private service: ProductsService, public dialogRef: MatDialogRef<CreateProductComponent>,
    private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: ProductModel | null) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      category: new FormControl('', [Validators.required, Validators.minLength(2)]),
      price: new FormControl('', [Validators.required, Validators.minLength(3)]),
      discount: new FormControl('', [Validators.required, Validators.minLength(2)]),
      instock: new FormControl('', [Validators.required]),
      images: new FormControl('', [Validators.required])
    });
    if (this.data) {
      this.isEdit = true;
      this.myForm.patchValue(this.data)
    }
    const products = this.service.getProducts();
    this.categories = [...new Set(products.map(p => p.category.name))]
  }

  public onFilesSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    this.selectedFile = Array.from(input.files);
    this.imagePreviews = [];
    this.selectedFile.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;
        if (result) {
          this.imagePreviews.push(result);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  public onSave(): void {
    if (this.myForm.valid) {
      const formValue = this.myForm.value;
      const newProduct = {
        id: this.data?.id,
        name: formValue.name,
        category: { id: 0, name: formValue.category },
        price: formValue.price,
        discount: formValue.discount,
        instock: formValue.instock,
        quantity: 1,
        images: this.imagePreviews
      }
      this.dialogRef.close(newProduct);
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
