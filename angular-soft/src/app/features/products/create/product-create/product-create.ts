import { ChangeDetectionStrategy,Component,inject,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '@features/products/domain/product.model';
import { ProductFacade } from '@features/products/application/product-facade';




@Component({
  selector: 'seph-product-create',
  imports: [],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreate {

}
