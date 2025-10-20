import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order, ShippingAddress } from '../models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = `${environment.apiUrl}/orders`;

  checkout(shippingAddress: ShippingAddress): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, 
      { shippingAddress },
      { headers: this.authService.getAuthHeaders() }
    ).pipe(
      tap(() => this.authService.loadCurrentUser())
    );
  }

  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
