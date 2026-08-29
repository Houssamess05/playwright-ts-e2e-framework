import { test, expect } from '@playwright/test';
import { brandsListResponse, brand } from '../data/api/brand.type';

export class BrandsApi {
    private readonly baseUrl: string = 'https://automationexercise.com';
    constructor() {
    }

    async getBrands(): Promise<brandsListResponse> {
        const response = await fetch(`${this.baseUrl}/api/brandsList`);
        const body = await response.json();
        return body;
    }
    
    async updateBrand(): Promise<brandsListResponse> {
        const response = await fetch(`${this.baseUrl}/api/brandsList`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: 1,
                brand: 'Apple'
            }),
        });
        const body = await response.json();
        return body;
    }
}