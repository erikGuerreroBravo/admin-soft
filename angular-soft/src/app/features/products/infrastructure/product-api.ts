import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../domain/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductApi {
    private readonly  http =inject(HttpClient);
    private readonly baseUrl = 'https://localhost:7000/api/products';

    create(product:Product):Observable<Product>{
        return this.http.post<Product>(this.baseUrl,product);
    }
  
}
