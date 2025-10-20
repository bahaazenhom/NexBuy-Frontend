import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = `${environment.apiUrl}/users/cart`;

  addToCart(productId: string, quantity: number = 1): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, 
      { productId, quantity },
      { headers: this.authService.getAuthHeaders() }
    ).pipe(
      tap(() => this.authService.loadCurrentUser())
    );
  }

  removeFromCart(productId: string, removeAll: boolean = true): Observable<any> {
    return this.http.post(`${this.apiUrl}/remove`, 
      { productId, removeAll },
      { headers: this.authService.getAuthHeaders() }
    ).pipe(
      tap(() => this.authService.loadCurrentUser())
    );
  }

  get cartCount(): number {
    const cart = this.authService.currentUser()?.cart || [];
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}
