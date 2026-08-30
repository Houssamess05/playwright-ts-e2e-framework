import { test, expect } from '@playwright/test';
import { ProductsApi } from '../../src/api/productsApi';
import { BrandsApi } from '../../src/api/brandsApi';
import { expectedProducts } from '../../src/data/api/product';


// 
test('POST /api/productsList - Intentar crear un producto al endpoint /api/productsList', async ({ request }) => {
    const productsApi = new ProductsApi(request);
    const response = await productsApi.createProductToList();
    expect(response.responseCode).toBe(405);
});

/// Test para comprobar que se obtiene la lista de productos.
/// Si la estructura de la respuesta es correcta y que el producto tenga una marca válida.
/// Si devuelve una lista vacia se da por mala respuesta del endpoint.
test('GET /api/productsList - Lista de productos', async ({ request }) => {
    // Se obtiene la lista de productos
    const productsApi = new ProductsApi(request);
    const response = await productsApi.getProducts();
    // Se comprueba que la respuesta es correcta
    expect(response.responseCode).toBe(200);
    expect(response.products.length).toBeGreaterThan(0);
    // Se obtiene la lista de brands
    const brandsApi = new BrandsApi(request);
    const brandsResponse = await brandsApi.getBrands();
    expect(brandsResponse.responseCode).toBe(200);
    const brands = brandsResponse.brands.map(brand => brand.brand);
    // Si hay productos en la lista, 
    // se comprueba que la estructura de la respuesta es correcta
    for (const product of response.products) {
        expect(product.id).toEqual(expect.any(Number));
        expect(product.name).toEqual(expect.any(String));
        expect(product.price).toEqual(expect.any(String));
        // Se comprueba que el producto tiene una marca válida
        expect(brands).toContain(product.brand);
        expect(product.category).toBeDefined();
        expect(product.category.usertype.usertype).toEqual(expect.any(String));
        expect(product.category.category).toEqual(expect.any(String));
    }
});


test('POST /api/searchProduct - Intentar buscar un producto al endpoint /api/searchProduct', async ({ request }) => {
    const productsApi = new ProductsApi(request);
    // Se commprueba explicitamente que el producto existe,
    //  TypeScritp necesita estos pasos para garantizar que el producto [0] existe.
    const product = expectedProducts.products.at(0);

    expect(product).toBeDefined();

    if (!product) {
        throw new Error('Expected product was not found in test data');
    }

    const response = await productsApi.searchProduct(product.name);

    expect(response.responseCode).toBe(200);
    const responseProduct = response.products[0];
    if (!responseProduct) {
        throw new Error('Response product does not exist');
    }
    expect(responseProduct.name).toBe(product.name);
    expect(responseProduct.price).toBe(product.price);
    expect(responseProduct.brand).toBe(product.brand);
    expect(responseProduct.category.usertype.usertype).toBe(product.category.usertype.usertype);
    expect(responseProduct.category.category).toBe(product.category.category);
});

test('POST /api/searchProduct - Missing search_product parameter', async ({ request }) => {
    const productsApi = new ProductsApi(request);
    const response = await productsApi.searchProductWithoutParam();
    expect(response.responseCode).toBe(400);
});

