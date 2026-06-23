import { Routes } from "@angular/router";
export const PRODUCTS_ROUTES: Routes =[{
    path:'create',
    loadComponent:()=> import('./create/product-create/product-create')
                       .then(m =>m.ProductCreate)
         
}];