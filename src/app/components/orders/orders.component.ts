import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  orders: Order[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getUserOrders().subscribe({
      next: (orders: Order[]) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load orders';
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'status-pending',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };
    return statusMap[status] || 'status-pending';
  }
}
