import { Routes } from '@angular/router';
import { AppShellComponent } from './core/layout/app-shell.component';
import { guestGuard } from './core/security/guest.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/form-layout/form-layout.component').then((m) => m.FormLayoutComponent)
      },
      {
        path: 'iam/users',
        loadComponent: () => import('./features/iam/users/users.component').then((m) => m.UsersComponent)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products.routes')
            .then(m => m.PRODUCTS_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
