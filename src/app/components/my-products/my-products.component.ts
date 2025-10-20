import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router);

  myProducts: Product[] = [];
  loading = true;
  error = '';

  currentUserId = this.authService.currentUser()?._id;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        // Filter products created by current user
        this.myProducts = products.filter(p => {
          const createdBy = typeof p.createdBy === 'string' ? p.createdBy : p.createdBy?._id;
          return createdBy === this.currentUserId;
        });
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load your products';
        this.loading = false;
      }
    });
  }

  viewProduct(productId: string) {
    this.router.navigate(['/products', productId]);
  }

  editProduct(productId: string) {
    this.router.navigate(['/edit-product', productId]);
  }

  deleteProduct(productId: string, event: Event) {
    event.stopPropagation(); // Prevent triggering viewProduct
    
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    const token = this.authService.getToken();
    if (!token) return;

    this.productService.deleteProduct(productId, token).subscribe({
      next: () => {
        this.myProducts = this.myProducts.filter(p => p._id !== productId);
      },
      error: (err: any) => {
        alert('Failed to delete product: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  addNewProduct() {
    this.router.navigate(['/add-product']);
  }
}
