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
import { DialogboxComponent } from '../../createproduct/dialogbox.component';
import { MatDialog } from '@angular/material/dialog';
import { category } from '../../../core/interfaces/category';
import { MatLabel, MatSelectModule } from '@angular/material/select';
import { MatTabLabel } from '@angular/material/tabs';

@Component({
  selector: 'app-product-dashboard',
  imports: [CommonModule, MatTableModule, FormsModule,
    MatPaginatorModule, MatButtonModule, RouterModule, MatIconModule, MatSelectModule],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.scss'
})
export class ProductDashboardComponent implements OnInit, AfterViewInit {
  search: string = ""
  ProductColumns: string[] = ['imageUrl', 'name', 'category', 'price', 'discount', 'action',];
  datasource = new MatTableDataSource<ProductModel>();
  displayData: ProductModel[] = []
  filteredproducts: ProductModel[] = []
  
  categories: category[] = [
      {value: 'All', viewValue: 'All'},
      {value: 'Painkiller', viewValue: 'Painkiller'},
      {value: 'Anticancer', viewValue: 'Anticancer'},
      {value: 'Capsules', viewValue: 'Capsules'},
      {value: 'NervePain', viewValue: 'NervePain'},
      {value: 'Digestion', viewValue: 'Digestion'},
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

  loadProducts() {
    this.datasource.data = this.service.getProducts();
  }

  onSearch() {
    if (!this.search.trim()) {
      this.datasource.data = this.displayData;
    }
    else {
      console.log(this.search);
      this.datasource.data = this.service.getProducts().filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
      this.datasource.data = this.service.getProducts().filter(item =>
        item.category.toLowerCase().includes(this.search.toLowerCase())
      );
      console.log(this.filteredproducts)
    }
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.addProduct(result);
        this.loadProducts();
      }
    });
  }

  openEditDialog(product: ProductModel, index: number) {
    const dialogRef = this.dialog.open(DialogboxComponent, {
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

  deleteProduct(index: number) {
    this.service.deleteProduct(index);
    this.loadProducts();
  }

  filterCategory(category:string){
    if(category==='All'){
      this.datasource.data=this.displayData;
    }else{
      this.datasource.data=this.displayData.filter(item=>item.category===category)
      console.log(this.datasource.data=this.displayData.filter(item=>item.category===category))
    }
  }
}
