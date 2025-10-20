import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/products`;

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Partial<Product>, token: string): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  updateProduct(id: string, product: Partial<Product>, token: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  deleteProduct(id: string, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
}
