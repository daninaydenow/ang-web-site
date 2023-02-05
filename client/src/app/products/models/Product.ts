export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  discountPercentage: number,
  rating: number,
  stock: number;
  brand: string,
  category: string;
  thumbnail: string;
  images: string[];
  quantity?: number;
  totalProductPrice?: string;
}
