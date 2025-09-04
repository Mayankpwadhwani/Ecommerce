import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { ProductModel } from '../../../core/interfaces/product';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CreateProductComponent } from '../../create-product/create-product.component';
import { Category } from '../../../core/interfaces/category';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-product-dashboard',
  imports: [CommonModule, MatTableModule, FormsModule,MatFormFieldModule,
    MatPaginatorModule, MatButtonModule, RouterModule, MatIconModule, MatSelectModule,MatInputModule],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.scss'
})
export class ProductDashboardComponent implements OnInit, AfterViewInit {
  search: string = ""
  ProductColumns: string[] = ['imageUrl', 'name', 'category', 'price', 'discount', 'action',];
  datasource = new MatTableDataSource<ProductModel>();
  displayData: ProductModel[] = []
  filteredproducts: ProductModel[] = []
  
  categories:Category[] = [
      {id:0,  name: 'All'},
      {id:1,  name: 'Painkiller'},
      {id:2,  name: 'Injection'},
      {id:3,  name: 'Anticancer'},
      {id:4,  name: 'Capsules'},
      {id:5,  name: 'NervePain'},
      {id:6,  name: 'Digestion'},
    ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ProductsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.displayData = this.service.getProducts();
    this.datasource.data = this.service.getProducts();
    this.loadProducts()
  }

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator
  }

  public loadProducts():void {
    this.datasource.data = this.service.getProducts();
  }

   public onSearchProducts():void{
    if (!this.search.trim()) {
      this.datasource.data = this.displayData;
    }
    else {
      this.datasource.data = this.service.getProducts().filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
      console.log(this.filteredproducts)
    }
  }

  public openCreateDialog():void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.addProduct(result);
        this.loadProducts();
      }
    });
  }

  public openEditDialog(product: ProductModel, index: number):void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '400px',
      data: { ...product }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.updateProduct(index, result);
        this.loadProducts();
      }
    });
  }

  public deleteProduct(index: number) {
    alert('Are you sure  you want to delete')
    this.service.deleteProduct(index);
    this.loadProducts();  
  }

  public filterCategory(category:Category){
    if(category.name==='All'){
      this.datasource.data=this.displayData;
      console.log(this.datasource.data)
    }else{
      this.datasource.data=this.displayData.filter(item=>item.category.name===category.name)
      console.log('selected',category.name)
      console.log(this.datasource.data=this.displayData.filter(item=>item.category.name===category.name))
    }
  }
}
