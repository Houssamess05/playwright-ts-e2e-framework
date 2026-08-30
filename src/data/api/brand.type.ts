export interface brand {
  id: number;
  brand: string;
}

export interface brandsListResponse {
  responseCode: number;
  brands: brand[];
}