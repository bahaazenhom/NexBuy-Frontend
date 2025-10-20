import { Component, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);

  products: Product[] = [];
  loading = true;
  error = '';

  isLoggedIn = this.authService.isAuthenticated;
  currentUser = this.authService.currentUser;

  Object = Object;  // Make Object available in template

  constructor() {
    // Reload products when user changes
    effect(() => {
      this.currentUser(); // Track the signal
      if (!this.loading) {
        this.loadProducts();
      }
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        // Filter out user's own products
        const currentUserId = this.currentUser()?._id;
        if (currentUserId) {
          this.products = products.filter(product => {
            const createdBy = typeof product.createdBy === 'string' 
              ? product.createdBy 
              : product.createdBy?._id;
            return createdBy !== currentUserId;
          });
        } else {
          this.products = products;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  getProductQuantityInCart(productId: string): number {
    const user = this.currentUser();
    if (!user || !user.cart) return 0;
    
    const cartItem = user.cart.find(item => {
      const itemProductId = typeof item.product === 'string' ? item.product : item.product._id;
      return itemProductId === productId;
    });
    
    return cartItem ? cartItem.quantity : 0;
  }

  addToCart(productId: string) {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart(productId).subscribe({
      next: () => {
        // Cart updated successfully
      },
      error: (err) => {
        alert('Failed to add to cart: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  increaseQuantity(productId: string, event: Event) {
    event.stopPropagation();
    this.addToCart(productId);
  }

  decreaseQuantity(productId: string, event: Event) {
    event.stopPropagation();
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.removeFromCart(productId, false).subscribe({
      next: () => {
        // Cart updated successfully
      },
      error: (err) => {
        alert('Failed to update cart: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  viewProduct(productId: string) {
    this.router.navigate(['/products', productId]);
  }
}
