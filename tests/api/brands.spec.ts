import { test, expect } from '@playwright/test';
import { BrandsApi } from '../../src/api/brandsApi';


test('GET /api/brandsList - Intentar obtener los brands al endpoint /api/brandsList', async ({ request }) => {
    const brandApi = new BrandsApi();    
    const response = await brandApi.getBrands();
    if(response.brands.length > 0) {
        for (const brand of response.brands) {
            expect(brand.id).toEqual(expect.any(Number));
            expect(brand.brand).toEqual(expect.any(String));
        }
    }
    expect(response.responseCode).toBe(200);
});

test('PUT /api/brandsList - Intentar actualizar un brand al endpoint /api/brandsList', async ({ request }) => {
    const brandApi = new BrandsApi();
    const response = await brandApi.updateBrand();
    expect(response.responseCode).toBe(405);
});



