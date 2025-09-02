import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../Core/services/products.service';
import { Product } from '../../Core/Interfaces/product';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-product-dashboard',
  imports: [CommonModule,MatTableModule,FormsModule,
    MatPaginatorModule,MatButtonModule,RouterModule,MatIconModule],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.scss'
})
export class ProductDashboardComponent implements OnInit,AfterViewInit {
search:string=""
ProductColumns: string[] = ['imageUrl','name','category','price', 'discount','action',];
datasource=new MatTableDataSource<Product>();
displayData:Product[]=[]
filteredproducts:Product[]=[]

@ViewChild(MatPaginator) paginator!:MatPaginator;
constructor(private service:ProductsService){}

ngOnInit(){
  this.displayData = this.service.getProducts();
  this.datasource.data=this.service.getProducts();
  }
ngAfterViewInit(){
  this.datasource.paginator=this.paginator
}
onclick(){
    if(!this.search.trim()){
  this.datasource.data=this.displayData;
}
else{
    console.log(this.search);
    this.datasource.data=this.service.getProducts().filter(item=>
      item.name.toLowerCase().includes(this.search.toLowerCase())
    );
    console.log(this.filteredproducts)
  }
}
}
