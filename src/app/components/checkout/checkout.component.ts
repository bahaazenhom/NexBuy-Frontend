import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { ShippingAddress } from '../../models';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private router = inject(Router);

  shippingAddress: ShippingAddress = {
    fullname: '',
    line: '',
    city: '',
    country: ''
  };

  loading = false;
  error = '';

  get cartItems() {
    return this.authService.currentUser()?.cart || [];
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => {
      const product = typeof item.product === 'string' ? null : item.product;
      return sum + ((product?.price || 0) * item.quantity);
    }, 0);
  }

  onSubmit() {
    if (!this.shippingAddress.fullname || !this.shippingAddress.line || 
        !this.shippingAddress.city || !this.shippingAddress.country) {
      this.error = 'Please fill in all shipping address fields';
      return;
    }

    this.loading = true;
    this.error = '';

    this.orderService.checkout(this.shippingAddress).subscribe({
      next: () => {
        this.loading = false;
        alert('Order placed successfully!');
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Failed to place order. Please try again.';
      }
    });
  }
}
