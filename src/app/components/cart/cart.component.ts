import { Component, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { User, CartItem } from '../../models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);

  cart: CartItem[] = [];
  loading = true;

  constructor() {
    // Automatically update cart when user changes
    effect(() => {
      const user = this.authService.currentUser();
      if (user && user.cart) {
        this.cart = user.cart;
      } else {
        this.cart = [];
      }
    });
  }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    const user = this.authService.currentUser();
    if (user && user.cart) {
      this.cart = user.cart;
    }
    this.loading = false;
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId, true).subscribe({
      next: () => {
        // Cart will be automatically updated via effect
      },
      error: (err) => {
        alert('Failed to remove item: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  increaseQuantity(productId: string) {
    this.cartService.addToCart(productId, 1).subscribe({
      next: () => {
        // Cart will be automatically updated via effect
      },
      error: (err) => {
        alert('Failed to update quantity: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  decreaseQuantity(productId: string) {
    this.cartService.removeFromCart(productId, false).subscribe({
      next: () => {
        // Cart will be automatically updated via effect
      },
      error: (err) => {
        alert('Failed to update quantity: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => {
      const product = typeof item.product === 'string' ? null : item.product;
      return sum + ((product?.price || 0) * item.quantity);
    }, 0);
  }

  proceedToCheckout() {
    if (this.cart.length === 0) {
      return;
    }
    this.router.navigate(['/checkout']);
  }

  continueShopping() {
    this.router.navigate(['/']);
  }
}
