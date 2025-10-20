import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', loadComponent: () => import('./components/product-list/product-list.component').then(m => m.ProductListComponent) },
  { path: 'products/:id', loadComponent: () => import('./components/product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
  { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent) },
  { path: 'checkout', loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent) },
  { path: 'my-products', loadComponent: () => import('./components/my-products/my-products.component').then(m => m.MyProductsComponent) },
  { path: 'add-product', loadComponent: () => import('./components/add-product/add-product.component').then(m => m.AddProductComponent) },
  { path: 'edit-product/:id', loadComponent: () => import('./components/edit-product/edit-product.component').then(m => m.EditProductComponent) },
  { path: 'orders', loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent) },
  { path: '**', redirectTo: '/products' }
];
