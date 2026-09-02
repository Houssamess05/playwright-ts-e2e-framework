import { APIRequestContext } from '@playwright/test';
import { ProductsListResponse } from '../data/api/product.types';

export class ProductsApi {
  
  constructor(private readonly request: APIRequestContext) {}

  /**
   * Fetches the list of products from the API.
   * @returns The list of products from the API.
   */
  async getProducts(): Promise<ProductsListResponse> {
    const response = await this.request.get(`api/productsList`);
    return await response.json();
  }

  /**
   * Creates a new product in the products list with predefined data.
   * @returns The response from the API.
   */
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

  /**
   * Searches for a product by name using the searchProduct endpoint.
   * @param name The product name to search for.
   * @returns The search response from the API.
   */
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

  /**
   * Searches for a product without providing the required search_product parameter, which is expected to result in a 400 Bad Request response.
   * @returns The response from the API.
   */
  async searchProductWithoutParam(): Promise<ProductsListResponse> {
      const response = await this.request.post(
        `api/searchProduct`,
        {
      
        }
      );

    return await response.json();
  }
}
