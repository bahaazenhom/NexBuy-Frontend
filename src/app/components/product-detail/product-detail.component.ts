import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommentService } from '../../services/comment.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product, Comment } from '../../models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private commentService = inject(CommentService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  product: Product | null = null;
  comments: Comment[] = [];
  loading = true;
  error = '';

  newComment = {
    rating: 5,
    text: ''
  };

  isLoggedIn = this.authService.isAuthenticated;
  currentUserId = this.authService.currentUser()?._id;
  currentUser = this.authService.currentUser;

  Object = Object;  // Make Object available in template

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    if (productId) {
      this.loadProduct(productId);
      this.loadComments(productId);
    }
  }

  getProductQuantityInCart(): number {
    if (!this.product) return 0;
    const user = this.currentUser();
    if (!user || !user.cart) return 0;
    
    const cartItem = user.cart.find(item => {
      const itemProductId = typeof item.product === 'string' ? item.product : item.product._id;
      return itemProductId === this.product?._id;
    });
    
    return cartItem ? cartItem.quantity : 0;
  }

  isOwnProduct(): boolean {
    if (!this.product) return false;
    const currentUserId = this.currentUser()?._id;
    if (!currentUserId) return false;
    
    const createdBy = typeof this.product.createdBy === 'string' 
      ? this.product.createdBy 
      : this.product.createdBy?._id;
    
    return createdBy === currentUserId;
  }

  loadProduct(productId: string) {
    this.loading = true;
    this.productService.getProduct(productId).subscribe({
      next: (product: Product) => {
        this.product = product;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Product not found';
        this.loading = false;
      }
    });
  }

  loadComments(productId: string) {
    this.commentService.getComments(productId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (err) => {
        console.error('Failed to load comments', err);
      }
    });
  }

  addToCart() {
    if (!this.isLoggedIn() || !this.product) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart(this.product._id).subscribe({
      next: () => {
        // Cart updated successfully
      },
      error: (err) => {
        alert('Failed to add to cart: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  increaseQuantity() {
    if (!this.product) return;
    this.addToCart();
  }

  decreaseQuantity() {
    if (!this.isLoggedIn() || !this.product) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.removeFromCart(this.product._id, false).subscribe({
      next: () => {
        // Cart updated successfully
      },
      error: (err) => {
        alert('Failed to update cart: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  deleteProduct() {
    if (!this.product) return;
    
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    const token = this.authService.getToken();
    if (!token) return;

    this.productService.deleteProduct(this.product._id, token).subscribe({
      next: () => {
        alert('Product deleted successfully!');
        this.router.navigate(['/my-products']);
      },
      error: (err) => {
        alert('Failed to delete product: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  submitComment() {
    if (!this.isLoggedIn() || !this.product) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.newComment.text.trim()) {
      return;
    }

    this.commentService.addComment({
      content: this.newComment.text,
      rate: this.newComment.rating,
      productId: this.product._id
    }).subscribe({
      next: (comment: Comment) => {
        this.comments.unshift(comment);
        this.newComment = { rating: 5, text: '' };
      },
      error: (err: any) => {
        alert('Failed to add comment: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  getStars(rating: number): string[] {
    return Array(5).fill('★').map((star, i) => i < rating ? '★' : '☆');
  }
}
