import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { ProductImage } from '../../models';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router);

  product = {
    title: '',
    desc: '',
    price: 0,
    images: [] as ProductImage[],
    specs: {} as { [key: string]: string | number }
  };

  imageUrl = '';
  imageAlt = '';
  specKey = '';
  specValue = '';

  loading = false;
  error = '';

  addImage() {
    if (this.imageUrl.trim() && this.imageAlt.trim()) {
      this.product.images.push({ url: this.imageUrl, alt: this.imageAlt });
      this.imageUrl = '';
      this.imageAlt = '';
    }
  }

  removeImage(index: number) {
    this.product.images.splice(index, 1);
  }

  addSpec() {
    if (this.specKey.trim() && this.specValue.trim()) {
      this.product.specs[this.specKey] = this.specValue;
      this.specKey = '';
      this.specValue = '';
    }
  }

  removeSpec(key: string) {
    delete this.product.specs[key];
  }

  getSpecKeys(): string[] {
    return Object.keys(this.product.specs);
  }

  onSubmit() {
    if (!this.product.title || !this.product.desc || this.product.price <= 0) {
      this.error = 'Please fill in all required fields';
      return;
    }

    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    this.error = '';

    this.productService.createProduct(this.product, token).subscribe({
      next: () => {
        this.loading = false;
        alert('Product created successfully!');
        this.router.navigate(['/my-products']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Failed to create product. Please try again.';
      }
    });
  }

  cancel() {
    this.router.navigate(['/my-products']);
  }
}
