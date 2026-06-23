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
 
  product: Product = {
    name: '',
    description: '',
    category: [],
    // 'price' is not a property on Product model; use 'prince' per model definition
    price: 0,
    // inicializamos la imagen con una imagen por default del sistema
    imageFiles: 'assets/products/default-product.png'
  }

  categoryText ='';
  onImageChange(event:Event):void{
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if(!file){
      return;
    }

    const localPath =`assets/products/${file.name}`
    this.product.imageFiles = localPath;
    this.imagePreview.set(localPath);

  }



  saveProduct(): void{
    this.product.category = this.categoryText
      .split(',')
      .map(category => category.trim())
      .filter(category => category.length > 0);

      this.productFacade.create(this.product);
  }
  resetForm():void{
    this.product =  {
      name: '',
      description: '',
      category: [],
      price: 0,
      imageFiles: 'assets/products/default-product.png'
    };

    this.categoryText ='';
    this.imagePreview.set('assets/products/default-product.png');

    this.productFacade.resetState();
  }

}
