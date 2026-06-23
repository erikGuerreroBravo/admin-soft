import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { Product } from '../domain/product.model';
import { ProductApi }  from '../infrastructure/product-api';

@Injectable({
  providedIn: 'root'
})
export class ProductFacade {
  private readonly productApi = inject(ProductApi);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _success = signal(false);
  private readonly _createProduct = signal<Product| null>(null);

readonly loading = computed( ()=> this._loading()  );
readonly error = computed( () => this._error());
readonly success = computed( () => this._success());
readonly createdProduct = computed( ()=> this._createProduct());
 

}
