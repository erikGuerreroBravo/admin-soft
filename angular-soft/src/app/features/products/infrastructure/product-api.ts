import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../domain/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductApi {
    private readonly  http =inject(HttpClient);
  
}
