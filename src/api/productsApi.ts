import { test, expect } from '@playwright/test';
import { Product, ProductsListResponse } from '../data/api/product.types';

export class ProductsApi {
  private readonly baseUrl: string = 'https://automationexercise.com';

  constructor() {
  }

  async getProducts(): Promise<ProductsListResponse> {
    const response = await fetch(`${this.baseUrl}/api/productsList`);
    const body = await response.json();
    return body;
  }

  async createProductToList(): Promise<ProductsListResponse> {
    const response = await fetch(`${this.baseUrl}/api/productsList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'iPhone 12',
        price: '$1,999.00',
        brand: 'Apple',
        category: {
          usertype: {
            usertype: 'Consumer',
          },
          category: 'Electronics',
        },
      }),
    });
    const body = await response.json();
    return body;
  }

  async searchProduct(name: string): Promise<ProductsListResponse> {
    const response = await fetch(`${this.baseUrl}/api/searchProduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
      }),
    });
    const body = await response.json();
    return body;
  }
}
