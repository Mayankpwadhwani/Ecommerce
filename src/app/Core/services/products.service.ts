import { Injectable } from '@angular/core';
import { ProductModel } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  storageKey = 'products';

  constructor() {
    this.AllProducts();
  }

  public AllProducts() {
    if (!localStorage.getItem(this.storageKey)) {
      const defaultProducts: ProductModel[] = [
        {
          id: 1,
          name: 'Paracetamol',
          price: 1000,
          discount: 10,
          finalprice: 0,
          category: { id: 1, 'name': 'Painkiller'},
          instock: 5,
          images: [],
          quantity: 1,
          reviews: []
        },
        {
          id: 2,
          name: 'Tetanus',
          price: 700,
          discount: 10,
          finalprice: 0,
          category: { id: 2, 'name': 'Injection' },
          instock: 10,
          images: ['data:image/jpeg;base64,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',
            'data:image/jpeg;base64,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'
          ],
          quantity: 1,
          reviews: []
        },
        {
          id: 3,
          name: 'Flea and Tick',
          price: 1300,
          discount: 12,
          finalprice: 0,
          category: { id: 3, 'name': 'Vet' },
          instock: 24,
          images: [],
          quantity: 1,
          reviews: []
        },
        {
          id: 4,
          name: 'Ivermectin',
          price: 1000,
          discount: 10,
          finalprice: 0,
          category: { id: 4, 'name': 'Anticancer' },
          instock: 5,
          images: [],
          quantity: 1,
          reviews: []
        },
        {
          id: 5,
          name: 'Boro',
          price: 1000,
          discount: 10,
          finalprice: 0,
          category: { id: 5, 'name': 'Capsules' },
          instock: 5,
          images: [],
          quantity: 1,
          reviews: []
        },
        {
          id: 6,
          name: 'Crocin',
          price: 1000,
          discount: 10,
          finalprice: 0,
          category: { id: 6, 'name': 'Painkiller' },
          instock: 5,
          images: [],
          quantity: 1,
          reviews: []
        },
        {
          id: 7,
          name: 'Etoshine',
          price: 1000,
          discount: 10,
          finalprice: 0,
          category: { id: 7, 'name': 'NervePain' },
          instock: 5,
          images: [],
          quantity: 1,
          reviews: []
        },
        {
          id: 8,
          name: 'PAN-d',
          price: 1000,
          discount: 10,
          finalprice: 0,
          category: { id: 8, 'name': 'Digestion' },
          instock: 5,
          images: [],
          quantity: 1,
          reviews: []
        }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(defaultProducts));
    }
  }

  public getProducts(): ProductModel[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  public addProduct(product: ProductModel): void {
    const products = this.getProducts();
    products.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  public updateProduct(updated: ProductModel) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === updated.id);
    if (index !== -1) {
      products[index] = updated;
    }
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  public deleteProduct(id: number): void {
    const products = this.getProducts().filter(p => p.id !== id)
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }
}


