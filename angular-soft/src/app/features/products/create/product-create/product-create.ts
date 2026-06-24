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
  
  //utilizamos un signal, tipado de Product ahora signal es un objeto que envuelve un product
  //los valores se leen a traves de una funcion
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
  //este metodo se asegura de unicamente trabajar con las propiedades adecuadas del object product
  //de esta manera no se pueden enviar valores no validos de la proiedad.
  updateProductField<K extends keyof Product>(
    field: K,
    value: Product[K]
  ): void {
    //este metodo update se encarga de actualizar el valor del objeto product pero utilizando 
    //los valores anteriores del objeto envuelto en la signal
    //debemos entenderlo asi: toma el objeto product el actual y copia sus valores del objeto
    //ahora cambia solo el valor del campo modificado, solo se actualiza el campo unico
    //guarda el nuevo valor modificado del objeto.
    this.product.update(product => ({
      ...product,
      [field]: value
    }));
  }

  updateCategoryText(value: string): void {
    //set es un metodo que se aplica a signal para actualizar todo el signal y su contenido
    this.categoryText.set(value);
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const localPath = `assets/products/${file.name}`;

    this.updateProductField('imageFiles', localPath);
    //modificamos el valor de signal con set
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
