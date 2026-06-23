import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../domain/product.model';
import { ResponseWrapper } from '../../../shared/models/response-wrapper.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductApi {
    private readonly  http =inject(HttpClient);
    private readonly baseUrl = `${ environment.apiBaseUrl}/products`;

    create(product:Product):Observable<ResponseWrapper<Product>>{
        return this.http.post<ResponseWrapper<Product>>(this.baseUrl,product);
    }
  
}
