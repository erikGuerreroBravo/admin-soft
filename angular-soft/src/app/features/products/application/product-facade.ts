import { Injectable, computed, inject, signal } from '@angular/core';
//sirve para ejecutar algo al terminar  una peticion ya sea con exito o con error.
import { finalize } from 'rxjs';//

import { Product } from '../domain/product.model';
import { ProductApi }  from '../infrastructure/product-api';

//permite que esta clase sea un servicio inyectable
@Injectable({
    //root indica que habra una sola instancia global del servicio
  providedIn: 'root' //esto significa que angular puede usar este servicio en toda la aplicacion
})
export class ProductFacade {
    //permite usar otros servicios dentro de la clase, en este caso inyecta un service api
    //inyectamos la clase de conexion con el api, private indica que solo esta clase la puede ver
    //readonly especifica que no se va a reasignar
    private readonly productApi = inject(ProductApi);

    //crea variables reactivas son todas las signals
    //guarda si esta enviando algo la api, empezamos con el valor 0, es decir si la api envio
    //algun dato
    private readonly _loading = signal(false);
    //guarda si existe un mensaje de error
    private readonly _error = signal<string | null>(null);
    //guarda si la operacion fue exitosa empezamos con false, indica si hay exito al guardar
    private readonly _success = signal(false);
    //guarda el producto creado que regresa a la api
    //al inicio no hay producto, por eso empieza en null
    private readonly _createProduct = signal<Product| null>(null);

    //las variables computed son valores de solo lectura basados en signals
    //expone el valor de _loading, pero sin permitir que el componente lo modifique
    //el componente puede leer pero no modificar el valor
    readonly loading = computed( ()=> this._loading()  );
    //permite que la ii leea el error , pero no lo modifique o altere
    readonly error = computed( () => this._error());
    //permite que la UI sepa si el producto  se guardo de forma correcta.
    readonly success = computed( () => this._success());
    //permite que la ui lea el producto creado, sin modificar su estado
    readonly createdProduct = computed( ()=> this._createProduct());

    //este metodo se encarga de recibir un objeto producto y lo manda a guardar
    //no regresa nada por eso se utilzia void
    create(product:Product): void{
        //detectamos el cambio o el movimiento
        this._loading.set(true);
        //limpiamos cualquier error anterior
        this._error.set(null);
        this._success.set(false);
        this._createProduct.set(null);

        this.productApi.create(product)
            .pipe(finalize( () => this._loading.set(false) ) )
            .subscribe({
                next:(response)=>{
                    this._success.set(true);
                    this._createProduct.set(response.data);
                },
            error: ()=> {
                this._error.set("No se Pudo guardar el producto, Intenta nuevamente.");
            }

        });
    }
    resetState():void{
        this._loading.set(false);
        this._error.set(null);
        this._success.set(false);
        this._createProduct.set(null);
    }

}
