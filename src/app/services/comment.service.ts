import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comment } from '../models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = `${environment.apiUrl}/comments`;

  getComments(productId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${productId}`);
  }

  addComment(data: { content: string; rate: number; productId: string }): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, data, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
