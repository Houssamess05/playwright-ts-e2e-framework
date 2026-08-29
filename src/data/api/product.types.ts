export interface Usertype {
  usertype: string;
}

export interface Category {
  usertype: Usertype;
  category: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: Category;
}

export interface ProductsListResponse {
  responseCode: number;
  products: Product[];
}

export interface SearchProductResponse {
  responseCode: number;
  products: Product[];
}


