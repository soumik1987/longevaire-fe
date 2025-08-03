import httpClient from './httpClient';
import type {
  Order,
  CreateOrderRequest,
  Payment,
  CreatePaymentRequest,
  PaginatedResponse,
  OrdersQueryParams,
  PaymentsQueryParams
} from '../types/api';

class OrderService {
  /**
   * Create a new order
   */
  async createOrder(data: CreateOrderRequest): Promise<Order> {
    return httpClient.post<Order>('/orders', data);
  }

  /**
   * Get all orders with pagination (Admin only)
   */
  async getAllOrders(params?: OrdersQueryParams): Promise<PaginatedResponse<Order>> {
    return httpClient.get<PaginatedResponse<Order>>('/orders', { params });
  }

  /**
   * Get order by ID
   */
  async getOrderById(id: number): Promise<Order> {
    return httpClient.get<Order>(`/orders/${id}`);
  }

  /**
   * Get user orders
   */
  async getUserOrders(userCode: string): Promise<Order[]> {
    return httpClient.get<Order[]>(`/orders/user/${userCode}`);
  }

  /**
   * Update order status
   */
  async updateOrderStatus(id: number, status: string): Promise<Order> {
    return httpClient.patch<Order>(`/orders/${id}/status`, { status });
  }

  /**
   * Cancel order
   */
  async cancelOrder(id: number): Promise<Order> {
    return httpClient.patch<Order>(`/orders/${id}/cancel`);
  }

  /**
   * Create payment for order
   */
  async createPayment(data: CreatePaymentRequest): Promise<Payment> {
    return httpClient.post<Payment>('/payments', data);
  }

  /**
   * Get all payments with pagination (Admin only)
   */
  async getAllPayments(params?: PaymentsQueryParams): Promise<PaginatedResponse<Payment>> {
    return httpClient.get<PaginatedResponse<Payment>>('/payments', { params });
  }

  /**
   * Get payment by ID
   */
  async getPaymentById(id: number): Promise<Payment> {
    return httpClient.get<Payment>(`/payments/${id}`);
  }

  /**
   * Get payments for specific order
   */
  async getOrderPayments(orderId: number): Promise<Payment[]> {
    return httpClient.get<Payment[]>(`/payments/order/${orderId}`);
  }

  /**
   * Process payment (integrate with payment gateway)
   */
  async processPayment(orderId: number, paymentData: {
    paymentMethod: string;
    amount: number;
    currency?: string;
    paymentGatewayData?: Record<string, any>;
  }): Promise<Payment> {
    return httpClient.post<Payment>(`/orders/${orderId}/process-payment`, paymentData);
  }

  /**
   * Refund payment
   */
  async refundPayment(paymentId: number, amount?: number): Promise<{
    success: boolean;
    refundId: string;
    amount: number;
  }> {
    return httpClient.post<{
      success: boolean;
      refundId: string;
      amount: number;
    }>(`/payments/${paymentId}/refund`, { amount });
  }

  /**
   * Get order summary/invoice
   */
  async getOrderSummary(orderId: number): Promise<{
    order: Order;
    payments: Payment[];
    totalPaid: number;
    remainingAmount: number;
    status: string;
  }> {
    return httpClient.get<{
      order: Order;
      payments: Payment[];
      totalPaid: number;
      remainingAmount: number;
      status: string;
    }>(`/orders/${orderId}/summary`);
  }

  /**
   * Get order statistics (Admin only)
   */
  async getOrderStats(): Promise<{
    totalOrders: number;
    totalRevenue: number;
    ordersThisMonth: number;
    revenueThisMonth: number;
    ordersByStatus: Record<string, number>;
  }> {
    return httpClient.get<{
      totalOrders: number;
      totalRevenue: number;
      ordersThisMonth: number;
      revenueThisMonth: number;
      ordersByStatus: Record<string, number>;
    }>('/admin/orders/stats');
  }
}

// Export singleton instance
export const orderService = new OrderService();
export default orderService;