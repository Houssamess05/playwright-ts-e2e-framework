import { APIRequestContext } from '@playwright/test';
import { ProductsListResponse } from '../data/api/product.types';

export class ProductsApi {
  
  constructor(private readonly request: APIRequestContext) {}

  async getProducts(): Promise<ProductsListResponse> {
    const response = await this.request.get(`api/productsList`);
    return await response.json();
  }

  async createProductToList(): Promise<ProductsListResponse> {
   const response = await this.request.post(`api/productsList`, {
      data: {
        name: 'iPhone 12',
        price: '$1,999.00',
        brand: 'Apple',
        category: {
          usertype: {
            usertype: 'Consumer',
          },
          category: 'Electronics',
        },
      },
    });
    return await response.json();
  }

  async searchProduct(name: string): Promise<ProductsListResponse> {
      const response = await this.request.post(
        `api/searchProduct`,
        {
          multipart: {
            search_product: name,
          }
        }
      );

    return await response.json();
  }

  async searchProductWithoutParam(): Promise<ProductsListResponse> {
      const response = await this.request.post(
        `api/searchProduct`,
        {
      
        }
      );

    return await response.json();
  }
}
