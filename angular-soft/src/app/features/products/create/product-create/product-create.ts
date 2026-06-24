import { ChangeDetectionStrategy,Component,inject,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '@features/products/domain/product.model';
import { ProductFacade } from '@features/products/application/product-facade';




@Component({
  selector: 'seph-product-create',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCreate {

  readonly productFacade = inject(ProductFacade);

  readonly imagePreview = signal('assets/products/default-product.png');
  
  //utilizamos un signal, tipado de Product 
  readonly product= signal<Product> ({
    name: '',
    description: '',
    category: [],
    // 'price' is not a property on Product model; use 'prince' per model definition
    price: 0,
    // inicializamos la imagen con una imagen por default del sistema
    imageFiles: 'assets/products/default-product.png'
  });

  categoryText = signal('');

  updateProductField<K extends keyof Product>(
    field: K,
    value: Product[K]
  ): void {
    this.product.update(product => ({
      ...product,
      [field]: value
    }));
  }

  updateCategoryText(value: string): void {
    this.categoryText.set(value);
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const localPath = `assets/products/${file.name}`;

    this.updateProductField('imageFiles', localPath);
    this.imagePreview.set(localPath);
    }



  saveProduct(): void {
    const categories = this.categoryText()
      .split(',')
      .map(category => category.trim())
      .filter(category => category.length > 0);

    const productToSave: Product = {
      ...this.product(),
      category: categories
    };

    this.productFacade.create(productToSave);
  }

  resetForm(): void {
    this.product.set({
      name: '',
      description: '',
      category: [],
      price: 0,
      imageFiles: 'assets/products/default-product.png'
    });

    this.categoryText.set('');
    this.imagePreview.set('assets/products/default-product.png');
    this.productFacade.resetState();
  }

}
