import { APIRequestContext } from '@playwright/test';
import { brandsListResponse } from '../data/api/brand.type';

export class BrandsApi {

    constructor(private readonly request: APIRequestContext) {}

    /**
     * Fetches the list of brands from the API.
     * @returns The list of brands from the API.
     */
    async getBrands(): Promise<brandsListResponse> {
        const response = await this.request.get('/api/brandsList');

        return await response.json();
    }

    /**
     * Tries to update brand ID 1 using the brandsList.
     * Returns the response from the API, which is expected to be a 405 Method Not Allowed error since the endpoint does not support PUT requests.
     * @returns The response from the API.
     */
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