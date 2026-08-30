import { APIRequestContext } from '@playwright/test';
import { brandsListResponse } from '../data/api/brand.type';

export class BrandsApi {

    constructor(private readonly request: APIRequestContext) {}

    async getBrands(): Promise<brandsListResponse> {
        const response = await this.request.get('/api/brandsList');

        return await response.json();
    }

    async updateBrand(): Promise<brandsListResponse> {
        const response = await this.request.put('/api/brandsList', {
            data: {
                id: 1,
                brand: 'Apple',
            },
        });

        return await response.json();
    }
}