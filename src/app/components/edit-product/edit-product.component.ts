import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { ProductImage } from '../../models';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  productId = '';
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

  loading = true;
  saving = false;
  error = '';

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    if (this.productId) {
      this.loadProduct();
    } else {
      this.error = 'Invalid product ID';
      this.loading = false;
    }
  }

  loadProduct() {
    this.loading = true;
    this.productService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.product = {
          title: product.title,
          desc: product.desc || '',
          price: product.price,
          images: product.images || [],
          specs: product.specs || {}
        };
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load product';
        this.loading = false;
      }
    });
  }

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

    this.saving = true;
    this.error = '';

    this.productService.updateProduct(this.productId, this.product, token).subscribe({
      next: () => {
        this.saving = false;
        alert('Product updated successfully!');
        this.router.navigate(['/my-products']);
      },
      error: (err) => {
        this.saving = false;
        this.error = err.error?.message || 'Failed to update product. Please try again.';
      }
    });
  }

  cancel() {
    this.router.navigate(['/my-products']);
  }
}
